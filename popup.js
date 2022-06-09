setInterval(poll, 2000);

function dispatchClick(node) {
  let event = document.createEvent("MouseEvents");
  event.initEvent("click", true, false);
  node.dispatchEvent(event);
}

function poll() {
  traceDOM(document.body, (node) => {
    if (
      node.nodeName == "#text" &&
      (node.textContent.indexOf("Admit") != -1 ||
        node.textContent.indexOf("承諾") != -1 ||
        node.textContent.indexOf("View all") != -1 ||
        node.textContent.indexOf("一覧を表示") != -1)
    ) {
      dispatchClick(node);
    }
    return false;
  });
}

function traceDOM(node, interceptor) {
  if (!node) return;
  if (interceptor(node)) return;
  if (node.nodeName === "IFRAME") {
    try {
      node = node.contentDocument;
      if (!node) return;
    } catch (e) {
      return;
    }
  }
  for (
    let childNode = node.firstChild;
    childNode;
    childNode = childNode.nextSibling
  ) {
    traceDOM(childNode, interceptor);
  }
}
