import * as d3 from "d3";

const MAX_WIN = 30, MAX_LOSS = -30;
const RANGE_MIN = -100, RANGE_MAX = 100;
const radius = 10;

export function runForceGraph(
    container,
    nodesData
) {

    const nodes = nodesData?.map((d) => Object.assign({}, d)) || [];

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height / 2;
    const width = containerRect.width / 2;

    const x = d3.scaleLinear()
        .domain([MAX_LOSS, MAX_WIN])
        .range([RANGE_MIN, RANGE_MAX])

    const color1 = "#9D79A0";
    const color2 = 'steelblue';

    const svg = d3
        .select(container)
        .append("svg")
        .attr('id', 'force')
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const node = svg
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", radius)
        .attr("fill", function(d) {
            return d.diff > 0 ? color1 : color2;
        })
        .style('stroke', 'black');

    const simulation = d3.forceSimulation(nodes)
        /*.force('collide', d3.forceCollide().radius(radius))
        .force('x', d3.forceX())
        .force('y', d3.forceY())*/
        .on("tick", ticked);

    function ticked() {
        node.attr("cx", function(d) {
            return x(d.x)
        })
    }

    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => {
            return svg.node();
        }
    };
}

/*
export function updateForceGraph(
    container,
    nodesData
) {
    const nodes = nodesData?.map((d) => Object.assign({}, d)) || [];
    const color = () => {
        return "#9D79A0";
    };

    const node = d3
        .select(container)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", radius)
        .attr("fill", color)
        .style('stroke', 'black');

    const simulation = d3.forceSimulation(nodes)
        .force('collide', d3.forceCollide().radius(radius))
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .on("tick", ticked);

    function ticked() {
        node.attr("cx", function(d) {
            return x(d.x)
        })
        node.attr("cy", function(d) {
            return d.y;
        })
    }
}
 */