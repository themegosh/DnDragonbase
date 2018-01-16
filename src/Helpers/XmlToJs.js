// XML to JS object based on
// http://www.kawa.net/works/js/xml/objtree-e.html#download

var XmlToJs = function () {
    return this;
};

XmlToJs.prototype.parseXML = function (xml) {
    var root;
    var dom = new window
        .DOMParser()
        .parseFromString(xml, "text/xml");
    if (!dom) 
        return;
    root = dom.documentElement;
    if (!root) 
        return;
    return this.parseDOM(root);
};

XmlToJs.prototype.parseDOM = function (root) {
    if (!root) 
        return;
    
    this.__force_array = {};
    if (this.force_array) {
        for (var i = 0; i < this.force_array.length; i++) {
            this.__force_array[this.force_array[i]] = 1;
        }
    }

    var json = this.parseElement(root); // parse root node
    if (this.__force_array[root.nodeName]) {
        json = [json];
    }
    if (root.nodeType !== 11) { // DOCUMENT_FRAGMENT_NODE
        var tmp = {};
        tmp[root.nodeName] = json; // root nodeName
        json = tmp;
    }
    return json;
};

XmlToJs.prototype.parseElement = function (elem) {
    //  COMMENT_NODE
    if (elem.nodeType === 7) {
        return;
    }

    //  TEXT_NODE CDATA_SECTION_NODE
    if (elem.nodeType === 3 || elem.nodeType === 4) {
        var bool = elem
            .nodeValue
            .match(/[^\x00-\x20]/);
        if (bool == null) 
            return; // ignore white spaces
        return elem.nodeValue;
    }

    var retval;
    var cnt = {};

    //  parse attributes
    if (elem.attributes && elem.attributes.length) {
        retval = {};
        for (var i = 0; i < elem.attributes.length; i++) {
            var key = elem.attributes[i].nodeName;
            if (typeof(key) !== "string") 
                continue;
            var val = elem.attributes[i].nodeValue;
            if (!val) 
                continue;
            key = '-' + key;
            if (typeof(cnt[key]) === "undefined") 
                cnt[key] = 0;
            cnt[key]++;
            this.addNode(retval, key, cnt[key], val);
        }
    }

    //  parse child nodes (recursive)
    if (elem.childNodes && elem.childNodes.length) {
        var textonly = true;
        if (retval) 
            textonly = false; // some attributes exists
        for (var i = 0; i < elem.childNodes.length && textonly; i++) {
            var ntype = elem.childNodes[i].nodeType;
            if (ntype === 3 || ntype === 4) 
                continue;
            textonly = false;
        }
        if (textonly) {
            if (!retval) 
                retval = "";
            for (var i = 0; i < elem.childNodes.length; i++) {
                //if we care about replacing \t and other weird things, do so here
                retval += elem.childNodes[i].nodeValue; //.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            }
        } else {
            if (!retval) 
                retval = {};
            for (var i = 0; i < elem.childNodes.length; i++) {
                var key = elem.childNodes[i].nodeName;
                if (typeof(key) !== "string") 
                    continue;
                var val = this.parseElement(elem.childNodes[i]);
                if (!val) 
                    continue;
                if (typeof(cnt[key]) === "undefined") 
                    cnt[key] = 0;
                cnt[key]++;
                this.addNode(retval, key, cnt[key], val);
            }
        }
    }
    return retval;
};

XmlToJs.prototype.addNode = function (hash, key, cnts, val) {
    if (this.__force_array[key]) {
        if (cnts === 1) 
            hash[key] = [];
        hash[key][hash[key].length] = val; // push
    } else if (cnts === 1) { // 1st sibling
        hash[key] = val;
    } else if (cnts === 2) { // 2nd sibling
        hash[key] = [hash[key], val];
    } else { // 3rd sibling and more
        hash[key][hash[key].length] = val;
    }
};

export default XmlToJs;
