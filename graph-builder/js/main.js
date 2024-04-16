import { Graph } from "./graph.js";
import { HandleUI } from "./uihandler.js";
import { DownloadGraph } from "./downloadgraph.js";

window.onload = () => {
    const graph = new Graph();
    const uiHandler = new HandleUI();

    const eventFunctions = {
        "generate-random": () => {
            graph.canvas.clearCanvas();
            graph.clearGraph();
            const graphSize = parseInt(
                                      uiHandler.getElement("graph-size").value);
            graph.generateRandomGraph(graphSize);
        },
        "create-node": () => {
            graph.generateRandomNodes(1);
        },
        "create-connection": () => {
            if(graph.getTotalNodes() !== 0) {
                graph.generateRandomConnections(1);
            }
        },
        "clear-canvas": () => {
            graph.canvas.clearCanvas();
            graph.clearGraph();
        },
        "ensure-complete": () => {
            if(graph.getTotalNodes() === 0) {
                graph.generateRandomGraph(TINY);
            }
            graph.ensureComplete();
        },
        "ensure-connected": () => {
            if (graph.getTotalNodes() === 0) {
                graph.generateRandomGraph(TINY);
            }
            graph.ensureConnectedGraph();
        },
        "download": () => {
            const downloader = new DownloadGraph();
            downloader.downloadGraphAsPng(graph);
        }
    };

    // Set an event listener on each of the object key,value pairs
    Object.entries(eventFunctions).forEach(([eventId, eventFunction]) => {
        document.getElementById(eventId).addEventListener("click", () => {
            eventFunction();
            uiHandler.updateStatsUI(graph.nodeId, graph.numConnections,
                                                             graph.connections);
        });
    });
};