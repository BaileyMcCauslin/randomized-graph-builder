import { Connection } from "./connection.js";
import { Node } from "./node.js";
import { Random } from "./random.js";
import { Canvas } from "./canvas.js";
import * as Constants from "./consts.js";

// Creates a graph to display to the user
export class Graph {
    constructor() {
        // An array of nodes in the graph 
        this.nodes = [];
        // An object where each node is a key
        //             with an array of it's connections as it's values.
        this.connections = {};

        // Keeps track of connections in graphs subtree
        this.connectedNodes = [];

        // RNG generator
        this.random = new Random();

        // Reference the canvas we will be drawing on 
        this.canvas = new Canvas();
        // Scale the canvas width and height to device size
        this.canvas.scaleCanvas();
        // Set the canvas drawing colors to default(black)
        this.canvas.setColor(Constants.GRAPH_COLOR_DEF,
                                                     Constants.GRAPH_COLOR_DEF);

        // Keep track of the node id's(how many nodes)
        this.nodeId = 0;

        // Keep track of the number of connections in the graph
        this.numConnections = 0;
    }

    getTotalNodes() {
        return this.nodes.length;
    }

    // Add a new node to the graph
    addNode(node) {
        const nodeLabel = node.label;
        this.nodes.push(node);

        this.connections[node.label] = [];

        // Check if first node on graph
        if(nodeLabel === 1) {
            this.connectedNodes.push(nodeLabel);
        }
    }

    // Add a connection between two nodes
    addConnection(startNode,endNode) {
        const startLabel = startNode.label;
        const endLabel = endNode.label;
        this.connections[startLabel].push(endLabel);
        this.connections[endLabel].push(startLabel);
        this.numConnections++;
    }

    // Creates a node and adds it to the graph.
    generateNode() {
        const [xPos,yPos] = this.random.generateRandomPos(
                                this.canvas.ref.height-Constants.NODE_Y_OFFSET,
                                 this.canvas.ref.width-Constants.NODE_X_OFFSET);
        
        const node = new Node(this.nodeId+1,xPos,yPos,this.canvas.ctx);
        node.drawNode();
        this.addNode(node); 
        this.nodeId++;
    }

    // Generates random nodes
    generateRandomNodes(numNodes) {
        if(numNodes === 0) {
            return;
        }
        
        this.generateNode();
        this.generateRandomNodes(numNodes-1);
    }

    // Checks if the node is part of the already connected subgraph
    isPartOfConnectedSubgraph(nodeIndex) {
        // Check if the node is in the connected subtree or if its the first
        // node in the graph
        return (!this.connectedNodes.includes(this.nodes[nodeIndex].label) ||
                         (nodeIndex === 0 && this.connections[1].length === 0));
    }

    // Ensure the the graph is connected by adding to it's subtree
    ensureConnectedGraph() {
        const totalNodeCount = this.getTotalNodes();
        if(totalNodeCount >= Constants.MIN_NODES) {
            for(let nodeIndex = 0; nodeIndex < totalNodeCount; nodeIndex++) {
                // Check if the current node is part of connected subgraph
                if(this.isPartOfConnectedSubgraph(nodeIndex)) {
                    let randomNodeConnection = this.random.getRandomIndex(
                                                0,this.connectedNodes.length-1);
                    let endNodeIndex = this.connectedNodes[
                                                          randomNodeConnection];
                    
                    const startNode = this.nodes[nodeIndex];
                    const endNode = this.nodes[endNodeIndex];
            
                    this.generateConnection(startNode,endNode);
                    this.connectedNodes.push(startNode.label);
                }
            }
        }
    }

    // Create a new connection between a start and end node
    generateConnection(startNode,endNode) {
        this.addConnection(startNode,endNode);
        const connection = new Connection(startNode,endNode,this.canvas.ctx);
        connection.drawConnection();
    }

    // Connected two random nodes
    generateRandomConnections(numConnections) {
        if(numConnections === 0) {
            return;
        }

        let randStartNode = this.random.getRandomIndex(0,this.getTotalNodes());
        const startNodeLabel = this.nodes[randStartNode].label;

        let availableConnections = this.getAvailableConnections(
                              startNodeLabel,this.connections[startNodeLabel]);

        if(availableConnections.length !== 0) {
            let randomNodeIndex = this.random.getRandomIndex(
                                                 0,availableConnections.length);
            let newConnectionIndex = availableConnections.pop(randomNodeIndex);
            
            const startNode = this.nodes[randStartNode];
            const endNode = this.nodes[newConnectionIndex-1];
    
            this.generateConnection(startNode,endNode);
        }
        
        this.generateRandomConnections(numConnections-1);
    }

    // Return the desired graph size
    getGraphSize(graphSize) {
        return Constants.GRAPH_SIZE[graphSize];
    }

    // Get the possible connections for a node(ones that its not connected to)
    getAvailableConnections(currentLabel,connections) {
        let availableConnections = [];
        for(let nodeIndex = 0; nodeIndex < this.getTotalNodes(); nodeIndex++) {
            const nodeLabel = this.nodes[nodeIndex].label;
            if(currentLabel !== nodeLabel && !connections.includes(nodeLabel)) {
                availableConnections.push(nodeLabel);
            }
        }
        return availableConnections;
    }

    // Ensure that the generated graph is complete
    ensureComplete() {
        for(let connection in this.connections) {
            let availableConnections = this.getAvailableConnections(connection,
                                                  this.connections[connection]);

            while(availableConnections.length !== 0) {
                const randomNodeIndex = this.random.getRandomIndex(
                                                 0,availableConnections.length);
                let newConnectionIndex = availableConnections.pop(
                                                               randomNodeIndex);
                const startNode = this.nodes[connection-1];
                const endNode = this.nodes[newConnectionIndex-1];
                this.generateConnection(startNode,endNode);
                this.connectedNodes.push(startNode.label);
            }
        }
    }

    // Generate a random graph given size
    generateRandomGraph(size) {
        const [min,max] = this.getGraphSize(size);
        const numberNodes = this.random.getRandomIndex(min,max);
        const numberConnections = this.random.getRandomIndex(min,max);

        this.generateRandomNodes(numberNodes);
        this.generateRandomConnections(numberConnections);
    }

    // Reset the graph 
    clearGraph() {
        this.nodes = [];
        this.connections = {};
        this.nodeId = 0;
        this.numConnections = 0;
        this.connectedNodes = [];
    }
}