// Title: Tigra Tree Menu PRO
// URL: http://www.softcomplex.com/products/tigra_menu_tree_pro/
// Version: 1.1
// Date: 04-30-2003 (mm-dd-yyyy)
// Technical Support: support@softcomplex.com (specify product title and order ID)
// Notes: Registration needed to use this script legally.
// Visit official site for details.

function tree(ttmpA, ttmpB) {
    this.a_tpl = ttmpB;
    this.a_config = ttmpA;
    this.o_root = this;
    this.a_index = [];
    this.a_nodes = [];
    this.o_selected = null;
    this.n_depth = -1;
    var ttmpC = new Image(),
        ttmpD = new Image();
    ttmpC.src = ttmpB['icon_e'];
    ttmpD.src = ttmpB['icon_l'];
    ttmpB['im_e'] = ttmpC;
    ttmpB['im_l'] = ttmpD;
    for (var i = 0; i < 128; i++) if (ttmpB['icon_' + i]) {
        var ttmpE = new Image();
        ttmpB['im_' + i] = ttmpE;
        ttmpE.src = ttmpB['icon_' + i]
    }
    this.toggle = function (n_id) {
        var ttmpF = this.a_index[n_id];
        ttmpF.open(ttmpF.n_state & 8)
    };
    this.select = function (n_id) {
        return this.a_index[n_id].select()
    };
    this.mover = function (n_id) {
        var ttmpF = this.a_index[n_id];
        ttmpF.ttmpG();
        ttmpF.mover(true)
    };
    this.mout = function (n_id) {
        var ttmpF = this.a_index[n_id];
        ttmpF.ttmpG(true);
        ttmpF.mout(true)
    };
    this.find_item = function (ttmpH) {
        for (var i = 0; i < this.a_index.length; i++) if (this.a_index[i].a_config[0] == ttmpH) {
            return (this.a_index[i]);
            break
        }
    };
    this.ttmpI = false;
    this.ndom_refresh = function () {
        if (!B_DOM && this.ttmpI) window.location = window.location
    };
    this.reset_state = function () {
        document.cookie = 'tree_' + this.o_root.n_id + '_state=';
        this.a_states = []
    };
    this.a_children = [];
    for (var i = 0; i < ttmpA.length; i++) this.a_children[this.a_children.length] = new ttmpJ(this, i);
    B_DOM = Boolean(document.body && document.body.innerHTML);
    this.n_id = TREES.length;
    TREES[this.n_id] = this;
    this.a_states = [];
    var ttmpK = /^\s*(\S+)\s*=\s*(\S*)\s*$/,
        ttmpL = document.cookie.split(';'),
        ttmpM, ttmpN, ttmpM = 'tree_' + this.o_root.n_id + '_state';
    for (var i = 0; i < ttmpL.length; i++) {
        if (!ttmpK.exec(ttmpL[i]) || RegExp.$1 != ttmpM) continue;
        ttmpN = RegExp.$2;
        this.a_states = ttmpN.split('_');
        break
    }
    if (ttmpB['beforeInit']) {
        eval('var ttmpO=' + ttmpB['beforeInit'] + '(this);');
        if (!ttmpO) return
    }
    for (var i = 0; i < this.a_children.length; i++) {
        this.a_children[i].ttmpP = ttmpQ;
        document.write(this.a_children[i].ttmpP())
    }
    if (ttmpB['afterInit']) eval(ttmpB['afterInit'] + '(this);')
}
function ttmpJ(o_parent, n_order) {
    this.o_root = o_parent.o_root;
    this.n_depth = o_parent.n_depth + 1;
    this.a_config = o_parent.a_config[n_order + (this.n_depth ? 3 : 0)];
    while (!this.a_config[this.a_config.length - 1]) this.a_config.length = this.a_config.length - 1;
    this.n_id = this.o_root.a_index.length;
    this.o_root.a_index[this.n_id] = this;
    if (this.a_config.length < 4) return;
    this.n_node_id = this.o_root.a_nodes.length;
    this.o_root.a_nodes[this.n_node_id] = this;
    for (var i = 3; i < this.a_config.length; i++) new ttmpJ(this, i - 3)
}
function ttmpR(ttmpS, ttmpT) {
    if (Boolean(this.n_state & 8) != Boolean(ttmpS)) return;
    var ttmpU = (this.a_config[2] ? this.a_config[2][ttmpS ? 'hc' : 'ho'] : null);
    ttmpU = (ttmpU ? ttmpU : this.o_root.a_tpl[ttmpS ? 'onItemClose' : 'onItemOpen']);
    if (ttmpU) {
        eval('var ttmpO=' + ttmpU + '(this);');
        if (!ttmpO) return
    }
    this.n_state ^= 8;
    this.o_root.ttmpI = true;
    this.state_lookup();
    this.ttmpG();
    this.save();
    if (B_DOM) {
        var ttmpV = ttmpW('c' + this.o_root.n_id + '_' + this.n_id);
        if (!ttmpV.innerHTML) ttmpV.innerHTML = this.ttmpX();
        ttmpV.style.display = (ttmpS ? 'none' : 'block')
    } else if (!ttmpT) window.location = window.location
}
function ttmpY(ttmpZ) {
    var ttmpU = (this.a_config[2] ? this.a_config[2][ttmpZ ? 'hd' : 'hs'] : null);
    ttmpU = (ttmpU ? ttmpU : this.o_root.a_tpl[ttmpZ ? 'onItemDeselect' : 'onItemSelect']);
    if (ttmpU) {
        eval('var ttmpO=' + ttmpU + '(this);');
        if (!ttmpO) return
    }
    if (ttmpZ) {
        this.n_state &= ~4
    } else {
        var ttmpa = this.o_root.o_selected;
        this.o_root.o_selected = this;
        if (ttmpa) ttmpa.select(true);
        this.n_state |= 4
    }
    this.state_lookup();
    this.ttmpG();
    return Boolean(this.a_config[1])
}
function ttmpb() {
    var ttmpU = (this.a_config[2] ? this.a_config[2]['hv'] : null);
    ttmpU = (ttmpU ? ttmpU : this.o_root.a_tpl['onItemMover']);
    if (ttmpU) {
        eval('var ttmpO=' + ttmpU + '(this);');
        if (!ttmpO) return
    }
    this.n_state |= 64;
    this.state_lookup()
}
function ttmpc() {
    var ttmpU = (this.a_config[2] ? this.a_config[2]['hu'] : null);
    ttmpU = (ttmpU ? ttmpU : this.o_root.a_tpl['onItemMout']);
    if (ttmpU) {
        eval('var ttmpO=' + ttmpU + '(this);');
        if (!ttmpO) return
    }
    this.n_state &= ~64;
    this.state_lookup()
}
function ttmpd(ttmpe) {
    window.setTimeout("window.status=unescape('" + (ttmpe ? '' : (this.a_config[2] && this.a_config[2]['sb'] ? escape(this.a_config[2]['sb']) : escape(this.a_config[0]) + (this.a_config[1] ? ' (' + escape(this.a_config[1]) + ')' : ''))) + "')", 10)
}
function ttmpQ() {
    var a_index = this.o_root.a_index,
        n_order = 0,
        n_id = this.n_id,
        o_parent;
    while (true) {
        n_id--;
        if (n_id < 0) break;
        if (a_index[n_id].n_depth < this.n_depth) {
            o_parent = a_index[n_id];
            break
        }
        if (a_index[n_id].n_depth == this.n_depth) n_order++
    }
    this.o_parent = o_parent ? o_parent : this.o_root;
    this.n_order = n_order;
    this.state_lookup = ttmpf;
    this.mover = ttmpb;
    this.mout = ttmpc;
    this.select = ttmpY;
    this.ttmpG = ttmpd;
    if (this.a_config.length > 3) {
        n_id = this.n_id;
        this.a_children = [];
        while (true) {
            n_id++;
            if (n_id == a_index.length) break;
            if (a_index[n_id].n_depth <= this.n_depth) break;
            if (a_index[n_id].n_depth == this.n_depth + 1) {
                a_index[n_id].ttmpP = ttmpQ;
                this.a_children[this.a_children.length] = a_index[n_id]
            }
        }
        this.open = ttmpR;
        this.save = ttmpg;
        this.load = ttmph;
        this.ttmpX = ttmpi
    } else {
        this.open = function () {
            alert("Only nodes can be opened. id=" + this.n_id)
        };
        this.load = function () {
            return
        }
    }
    this.n_state = (this.n_depth ? 0 : 32) + (this.a_children ? 16 : 0) + (this.n_order == this.o_parent.a_children.length - 1 ? 1 : 0);
    var ttmpj = (this.o_root.a_tpl['style_icons'] ? ' class="' + this.o_root.a_tpl['style_icons'] + '"' : ''),
        ttmpk = [],
        ttmpl = this.o_parent,
        ttmpm = this.a_config[2];
    for (var i = this.n_depth; i > 1; i--) {
        ttmpk[i] = '<img src="' + this.o_root.a_tpl[ttmpl.n_state & 1 ? 'icon_e' : 'icon_l'] + '"' + ttmpj + ' border="0">';
        ttmpl = ttmpl.o_parent
    }
    this.load();
    var ttmpn = this.state_lookup(true);
    return '<li onmouseover="TREES[' + this.o_root.n_id + '].mover(' + this.n_id + ')" onmouseout="TREES[' + this.o_root.n_id + '].mout(' + this.n_id + ')"><div class="tree_icons" nowrap>' + ttmpk.join('') + (ttmpn[1] ? (this.a_children ? '<a href="javascript: TREES[' + this.o_root.n_id + '].toggle(' + this.n_id + ')" onmouseover="TREES[' + this.o_root.n_id + '].mover(' + this.n_id + ')" onmouseout="TREES[' + this.o_root.n_id + '].mout(' + this.n_id + ')"><img src="' + ttmpn[1] + '" border="0" name="j' + this.o_root.n_id + '_' + this.n_id + '"' + ttmpj + '></a>' : '<img src="' + ttmpn[1] + '" border="0"' + ttmpj + '>') : '') + (ttmpn[0] ? '<a href="' + this.a_config[1] + '" target="' + (ttmpm && ttmpm['tw'] ? ttmpm['tw'] : this.o_root.a_tpl['target']) + '" title="' + (ttmpm && ttmpm['tt'] ? ttmpm['tt'] : '') + '" onclick="return TREES[' + this.o_root.n_id + '].select(' + this.n_id + ')" ondblclick="TREES[' + this.o_root.n_id + '].' + (this.a_children ? 'toggle(' : 'select(') + this.n_id + ')"><img src="' + ttmpn[0] + '" border="0" name="i' + this.o_root.n_id + '_' + this.n_id + '"' + ttmpj + '></a>' : '') + '</div><div class="tree_text" nowrap' + (ttmpn[2] ? ' class="' + ttmpn[2] + '"' : '') + ' id="t' + this.o_root.n_id + '_' + this.n_id + '"><a href="' + this.a_config[1] + '" target="' + (ttmpm && ttmpm['tw'] ? ttmpm['tw'] : this.o_root.a_tpl['target']) + '" title="' + (ttmpm && ttmpm['tt'] ? ttmpm['tt'] : '') + '" onclick="return TREES[' + this.o_root.n_id + '].select(' + this.n_id + ')" ondblclick="TREES[' + this.o_root.n_id + '].' + (this.a_children ? 'toggle(' : 'select(') + this.n_id + ')">' + this.a_config[0] + '</a></div></li>' + (this.a_children ? '<div id="c' + this.o_root.n_id + '_' + this.n_id + '" style="display:' + (this.n_state & 8 ? 'block">' + this.ttmpX() : 'none">') + '</div>' : '')
}
function ttmpi() {
    var ttmpo = [];
    for (var i = 0; i < this.a_children.length; i++) ttmpo[i] = this.a_children[i].ttmpP();
    return ttmpo.join('')
}
function ttmpg() {
    var ttmpp = Math.floor(this.n_node_id / 31);
    this.o_root.a_states[ttmpp] = (this.n_state & 8 ? this.o_root.a_states[ttmpp] | (1 << (this.n_node_id % 31)) : this.o_root.a_states[ttmpp] & ~ (1 << (this.n_node_id % 31)));
    document.cookie = 'tree_' + this.o_root.n_id + '_state=' + this.o_root.a_states.join('_')
}
function ttmph() {
    var ttmpU = (ttmpU ? ttmpU : this.o_root.a_tpl['onItemLoad']);
    if (ttmpU) {
        eval('var ttmpO=' + ttmpU + '(this);');
        if (!ttmpO) return
    }
    if (this.a_config[2] && typeof (this.a_config[2]['st']) == 'number') {
        if (Boolean(this.a_config[2]['st'])) this.n_state |= 8;
        else this.n_state &= ~8;
        return
    }
    if (!this.o_root.a_states.length) {
        var ttmpq = this.o_root.a_children;
        for (var i = 0; i < ttmpq.length; i++) {
            ttmpq[i].n_state |= 8;
            if (ttmpq[i].save) ttmpq[i].save()
        }
        return
    }
    var ttmpp = Math.floor(this.n_node_id / 31);
    if (Boolean(this.o_root.a_states[ttmpp] & (1 << (this.n_node_id % 31)))) this.n_state |= 8;
    else this.n_state &= ~8
}
function ttmpf(ttmpr) {
    var ttmps = this.n_state & ~3;
    var ttmpt = this.n_state & ~68 | 2;
    var ttmpu = this.a_config[2] ? this.a_config[2]['i' + (ttmps & ~48)] : 0;
    if (!ttmpu) ttmpu = this.o_root.a_tpl['icon_' + ttmps];
    if (!ttmpu) ttmpu = this.o_root.a_tpl['icon_' + (ttmps & ~64)];
    var ttmpv = this.o_root.a_tpl['icon_' + ttmpt];
    var ttmpw = this.a_config[2] ? this.a_config[2]['s' + (ttmps & ~48)] : 0;
    if (!ttmpw) ttmpw = this.o_root.a_tpl['style_' + ttmps];
    if (!ttmpw) ttmpw = this.o_root.a_tpl['style_' + (ttmps & ~64)];
    if (ttmpr) return [ttmpu, ttmpv, ttmpw];
    var ttmpx = document.images['j' + this.o_root.n_id + '_' + this.n_id];
    if (ttmpx) ttmpx.src = ttmpv;
    ttmpx = document.images['i' + this.o_root.n_id + '_' + this.n_id];
    if (ttmpx) ttmpx.src = ttmpu;
    ttmpx = ttmpW('t' + this.o_root.n_id + '_' + this.n_id);
    if (ttmpx) ttmpx.className = 'tree_text ' + ttmpw;
}
var TREES = [],
    B_DOM;
ttmpW = document.all ?
function (ttmpy) {
    return document.all[ttmpy]
} : (document.getElementById ?
function (ttmpy) {
    return document.getElementById(ttmpy)
} : function (ttmpy) {
    return null
});