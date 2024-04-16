export class DownloadGraph {
    // Download the canvas as a png
    downloadGraphAsPng(graph) {
        var image = graph.canvas.toDataURL();
        var downloadLink = document.createElement("a");
        downloadLink.download = "graph_image.png";
        downloadLink.href = image;
        downloadLink.click();
    }

    downloadJson() {
        return;
    }
}