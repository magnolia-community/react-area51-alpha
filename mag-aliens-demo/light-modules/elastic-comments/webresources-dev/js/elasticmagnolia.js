var queryString;
var esmClient;
var searchPageUrl;

$(document).ready(function() {
  // TODO This isn't firing, instead calling this from app using query-manager.
  console.log("Initializing the Magnolia e-commerce components");
  initializeElasticMagnolia();
});

function createSectionView(section) {
  var resultsInnerDiv = document.createElement("div");
  resultsInnerDiv.classList.add("container");

  var mainDiv = createResultSection(section.name);
  mainDiv.id = section.divId;
  mainDiv.append(resultsInnerDiv);

  executeSearch(section, resultsInnerDiv);

  return mainDiv;
}

function buildSearchTemplateBody(section) {
  var body = {
    id: section.searchTemplate,
    params: {
      fields: section.fields,
      highlights: buildHighlightsObject(section.fields),
      queryString: queryString
    }
  };

  return body;
}

function executeSearch(section, resultsInnerDiv) {
  esmClient
    .searchTemplate({
      index: section.index,
      body: buildSearchTemplateBody(section)
    })
    .then(
      function(body) {
        totalResults += body.hits.total;
        showingResults += body.hits.hits.length;
        updateSummaryDiv(totalResults, showingResults);
        $.map(body.hits.hits, function(item) {
          if (item._source[section.resultTitleField] != undefined) {
            resultsInnerDiv.append(
              createSearchResult(
                item._source[section.resultTitleField],
                item.highlight,
                section.pathPrefix + item._source[section.pathIdentifier]
              )
            );
          }
        });
      },
      function(error) {
        console.trace(error.message);
      }
    );
}

function buildHighlightsObject(fields) {
  var ret = {};
  for (var field of fields) {
    ret[field] = {};
  }
  return ret;
}
var totalResults = 0;
var showingResults = 0;
// TODO This library does not work on mobile (iPad and iPhone confirmed fail)
// This demo works on ios: https://jqueryui.com/autocomplete/
function initializeElasticMagnolia() {
  if (typeof searchComponents !== "undefined") {
    var summaryDiv = document.createElement("div");
    summaryDiv.id = "summaryDiv";
    $("#search-results").append(summaryDiv);

    queryString = searchComponents["queryString"];
    esmClient = new elasticsearch.Client({
      host: searchComponents["host"],
      log: "info"
    });
    for (var section of searchComponents.sections) {
      if (section.hasOwnProperty("completed") && !section["completed"]) {
        document
          .getElementById("search-results")
          .append(createSectionView(section));
        section["completed"] = true;
      }
    }
  }

  var jumpTo = "Jump To...";

  $("#search-button").click(function() {
    // TODO FixMe This direct link is broken if a page is created somewhere else and with a different name.
    window.location.href = searchPageUrl + "?q=" + $("#search").val();
  });
  // This isn't working on mobile (iPad with keyboard).
  $("#search").keyup(function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      window.location.href = searchPageUrl + "?q=" + $("#search").val();
    }
  });

  var accentMap = {
    á: "a",
    ö: "o",
    é: "e"
  };
  var normalize = function(term) {
    var ret = "";
    for (var i = 0; i < term.length; i++) {
      ret += accentMap[term.charAt(i)] || term.charAt(i);
    }
    return ret;
  };

  //widget extension
  $.widget("custom.catautocomplete", $.ui.autocomplete, {
    //NOTE: this will process the items in order, so a category could show up multiple times
    _renderMenu: function(ul, items) {
      var that = this;
      var currentCategory = "";
      $.each(items, function(index, item) {
        if (item.category != currentCategory) {
          ul.append(
            "<li class='ui-autocomplete-category'>" + item.category + "</li>"
          );
          currentCategory = item.category;
        }
        that._renderItemData(ul, item);
      });
    }
  });

  $.ui.autocomplete.prototype._renderItem = function(ul, item) {
    var startElem = null;

    if (item.value == "label") {
      startElem = $("<li></li>")
        .addClass("categoryLabel")
        .data("item.autocomplete", item)
        .append('<a style="display:none;"></a>')
        .append(item.label)
        .appendTo(ul);
    } else {
      startElem = $("<li></li>")
        .data("item.autocomplete", item)
        .append('<a href="' + item.path + '">' + item.label + "</a>")
        .appendTo(ul);
    }
    return startElem;
  };

  $("#search").catautocomplete({
    source: function(request, response) {
      esmClient
        .search({
          index: "pages-new",
          body: {
            suggest: {
              "title-suggest": {
                prefix: $("#search").val(),
                completion: {
                  field: "title.completion",
                  fuzzy: {
                    fuzziness: 2
                  }
                }
              }
            }
          }
        })
        .then(
          function(body) {
            response(
              $.map(body.suggest["title-suggest"][0].options, function(item) {
                if (item != undefined) {
                  if (item._source.group == undefined) {
                    return {
                      label: item._source.title,
                      id: item._id,
                      path: item._source.path,
                      category: jumpTo
                    };
                  } else {
                    // Pulling the first of group. Should only ever be one element.
                    return {
                      label: item._source.title,
                      id: item._id,
                      path: item._source.path,
                      category: item._source.group[0]
                    };
                  }
                }
              })
            );
          },
          function(error) {
            console.trace(error.message);
          }
        );
    },
    minLength: 2,
    open: function() {
      $(".ui-menu-item a").removeClass("ui-corner-all");
    }
  });
}

function createResultSection(name) {
  let resultsDiv = document.createElement("div");
  resultsDiv.id = name.replace(" ", "-").toLowerCase() + "results-div";
  resultsDiv.style = "padding-bottom: 10px;";
  let header = document.createElement("h2");
  header.append(document.createTextNode(name));
  resultsDiv.append(header);
  return resultsDiv;
}

function createSearchResult(title, highlights, path) {
  var pathDiv = document.createElement("div");
  pathDiv.classList.add("col-12");
  var titleDiv = document.createElement("div");
  var linkA = document.createElement("a");
  var h3 = document.createElement("h3");
  h3.append(document.createTextNode(title));
  linkA.append(h3);
  linkA.append(document.createElement("br"));
  var citeDiv = document.createElement("div");
  citeDiv.style = "display:inline-block";
  citeDiv.classList.add("searchCiteDiv");
  var cite = document.createElement("cite");
  cite.append(document.createTextNode(window.location.origin + path));
  cite.classList.add("searchCite");
  citeDiv.append(cite);
  linkA.append(citeDiv);
  linkA.href = path;
  titleDiv.append(linkA);
  pathDiv.append(titleDiv);
  var hightlightsDiv = document.createElement("div");
  for (var key in highlights) {
    for (var highlight in highlights[key]) {
      var span = document.createElement("span");
      span.classList.add("st");
      span.innerHTML = stripTags(highlights[key][highlight], "em");
      hightlightsDiv.append(span);
    }
  }
  pathDiv.append(hightlightsDiv);
  return pathDiv;
}

// TODO when a paged item is clicked, send the index number in searchComponents and the number to start from.
function pageResults(sectionIndex, startResult) {}

function updateSummaryDiv(totalResults, showingResults) {
  document.getElementById("summaryDiv").innerHTML =
    "Showing " + showingResults + " of " + totalResults + " Results";
}

function stripTags(_html) {
  _html = _html.trim();
  // Strange issue with highlights starting with the following, removing.
  var strangeEm1 = "</em> <em>";
  var strangeEm2 = "</em>";
  if (_html.startsWith(strangeEm1)) {
    _html = _html.substring(_html.indexOf(strangeEm1) + strangeEm1.length);
  } else if (_html.startsWith(strangeEm2)) {
    _html = _html.substring(_html.indexOf(strangeEm2) + strangeEm2.length);
  }
  var _tags = [],
    _tag = "";
  for (var _a = 1; _a < arguments.length; _a++) {
    _tag = arguments[_a].replace(/<|>/g, "").trim();
    if (arguments[_a].length > 0) _tags.push(_tag, "/" + _tag);
  }

  if (!(typeof _html == "string") && !(_html instanceof String)) return "";
  else if (_tags.length == 0) return _html.replace(/<(\s*\/?)[^>]+>/g, "");
  else {
    var _re = new RegExp("<(?!(" + _tags.join("|") + ")s*/?)[^>]+>", "g");
    return _html.replace(_re, "");
  }
}
