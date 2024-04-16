// Handle UI
export class HandleUI {

    // Get an element, in this case always by id
    getElement(id) {
        return document.getElementById(id);
    }

    // Set an elements text
    setElementText(element,text) {
        element.textContent = text;
    }

    // Update the graphs stats
    updateStatsUI(numNodes,numConnections,connections) {
        const numNodesUi = this.getElement("nodes");
        this.setElementText(numNodesUi,`Number of nodes: ${numNodes}`);
        const numConnectionsUi = this.getElement("num-connections");
        this.setElementText(numConnectionsUi,
                                    `Number of connections: ${numConnections}`);
        const connectionsUi = this.getElement("connections");
        this.setElementText(connectionsUi,
                                 `Connections: ${JSON.stringify(connections)}`);
    }

    // Toggle the stats menu
    toggleStats() {
        const statsPanel = this.getElement("graph-stats");
        const statsBtn = this.getElement("see-stats");
        statsPanel.hidden = statsPanel.hidden ? false : true;
        this.setElementText(statsBtn,statsPanel.hidden ? "Show graph stats" :
                                                            "Hide graph stats");
    }
}