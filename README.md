# Randomized Graph Builder

The Randomized Graph Builder project aims to provide users with the ability to randomly generate various graph theory graphs while offering insights into the graph's statistics and the option to download it as a PNG image. This project utilizes a straightforward technology stack consisting of vanilla JavaScript, HTML, and CSS.

## Usage
Visit the site: [Randomized Graph Builder](https://baileymccauslin.github.io/randomized-graph-builder/)

### Operations
- **Create Node**: Generates a single vertex at a random position on the canvas.
- **Create Connection**: Establishes an edge between any two vertices, provided they are not already connected.
- **Ensure Connected**: Validates that the graph is connected, ensuring at least one edge per vertex.
- **Ensure Complete**: Ensures that each vertex of the graph has \( n-1 \) edges.

- **Generate Random**: Generates a random graph based on a specified size parameter (not guaranteed to be connected). After generating a graph, you can click "Ensure Connected" or "Ensure Complete" to convert the graph accordingly.
- **Clear Graph**: Resets the current graph, returning the canvas to a blank state.
- **Show Graph Stats**: Displays statistics about the current graph.
- **Download Graph**: Saves the graph as a PNG image.

## How to Run Locally
To run the application locally, you'll need [http-server](https://www.npmjs.com/package/http-server).

1. Navigate to the graph builder directory.
2. Run `http-server` (the `-c-1` flag is optional).

## Future Work
- Allow users to specify the number of vertices and edges through an input form.
- Enable downloading the graph as a JSON file (utilizing JavaScript objects instead of maps).
- Implement drag-and-drop functionality on the canvas to move vertices and edges around.
- Directed Graphs and Weights?
- Search Algorithms(DFS,BFS,A*, ext.)
