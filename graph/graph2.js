var Connect = {};
var Graph = Connect.Graph = function() {
	this.nodeSet = {};
	this.nodes = [];
	this.edges = [];
	this.adjacency = {};

	this.nextNodeId = 0;
	this.nextEdgeId = 0;
};

var Node = Connect.Node = function(id, data) {
	this.id = id;
	this.data = (data !== undefined) ? data : {};
};

var Edge = Connect.Edge = function(id, source, target, data) {
	this.id = id;
	this.source = source;
	this.target = target;
	this.data = (data !== undefined) ? data : {};
};

Graph.prototype.addNode = function(node) {
	if (!(node.id in this.nodeSet)) {
		this.nodes.push(node);
	}

	this.nodeSet[node.id] = node;

	return node;
};


	Graph.prototype.addEdge = function(edge) {
		var exists = false;
		this.edges.forEach(function(e) {
			if (edge.id === e.id) { exists = true; }
		});

		if (!exists) {
			this.edges.push(edge);
		}

		if (!(edge.source.id in this.adjacency)) {
			this.adjacency[edge.source.id] = {};
		}
		if (!(edge.target.id in this.adjacency[edge.source.id])) {
			this.adjacency[edge.source.id][edge.target.id] = [];
		}

		exists = false;
		this.adjacency[edge.source.id][edge.target.id].forEach(function(e) {
				if (edge.id === e.id) { exists = true; }
		});

		if (!exists) {
			this.adjacency[edge.source.id][edge.target.id].push(edge);
		}
		return edge;
	};

	Graph.prototype.newNode = function(label, x, y) {
	    var data = {label : label, x: x, y: y};
		var node = new Node(this.nextNodeId++, data);
		this.addNode(node);
		return node;
	};

	Graph.prototype.newEdge = function(source, target, color) {
	    var data = {color: color};
		var edge = new Edge(this.nextEdgeId++, source, target, data);
		this.addEdge(edge);
		return edge;
	};

	Graph.prototype.loadJSON = function(json) {
	
		// parse if a string is passed (EC5+ browsers)
		if (typeof json == 'string' || json instanceof String) {
			json = JSON.parse( json );
		}

		if ('nodes' in json || 'edges' in json) {
			this.addNodes.apply(this, json['nodes']);
			this.addEdges.apply(this, json['edges']);
		}
	}



	Graph.prototype.getEdges = function(node1, node2) {
		if (node1.id in this.adjacency
			&& node2.id in this.adjacency[node1.id]) {
			return this.adjacency[node1.id][node2.id];
		}

		return [];
	};

	Graph.prototype.drawGraph = function(){
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		for(var j = 0; j < this.nodes.length; j++){
			var label = this.nodes[j].data.label;
			var x = this.nodes[j].data.x;
			var y = this.nodes[j].data.y;
			var tx = graph.edges[j].target.data.x;
			var ty = graph.edges[j].target.data.y;
			ctx.beginPath();
			ctx.arc(x,y,10,0,2*Math.PI);
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(tx, ty);
			ctx.lineWidth = 2;
      		ctx.strokeStyle = 'blue';
      		ctx.stroke();
		}
	};
var graph = new Graph();