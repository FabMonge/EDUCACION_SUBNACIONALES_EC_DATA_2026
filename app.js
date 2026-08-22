// ==========================================
// 1. PANEL DE CONFIGURACIÓN MODULAR (CONFIG)
// ==========================================
const CONFIG = {
    colores: {
        "Secundaria": "#7B241C",             
        "Superior universitaria": "#2E4053", 
        "Sin datos": "#7F8C8D",              
        "Posgrado **": "#117A65",            
        "Primaria": "#B2BABB",               
        "Superior técnica": "#D68910",
        // Colores agregados del CSV del Dashboard
        "Universitaria": "#2E4053",
        "Posgrado": "#117A65",
        "Técnica": "#D68910",
        // Colores para el Donut de Carreras (Top Level)
        "Ingeniería": "#2E4053", 
        "Educación": "#117A65", 
        "Derecho": "#7B241C"
    },
    svg: {
        width: 800,
        height: 500,
        margin: 60 
    },
    animationSpeed: 1000
};

// ==========================================
// 2. DATA
// ==========================================
const educacionData = [
    { label: "Primaria", abs: 444, pct: 4.6 },
    { label: "Secundaria", abs: 50773, pct: 52.4 },
    { label: "Superior técnica", abs: 2815, pct: 2.9 },
    { label: "Superior universitaria", abs: 22042, pct: 22.7 },
    { label: "Posgrado **", abs: 6428, pct: 6.6 },
    { label: "Sin datos", abs: 10463, pct: 10.8 }
];

const edadesData = [
    { cargo: "Gobernador regional", promedio: 54, min: 27, max: 81 },
    { cargo: "Alcalde provincial", promedio: 49, min: 19, max: 86 },
    { cargo: "Alcalde distrital", promedio: 48, min: 20, max: 92 },
    { cargo: "Vicegobernador regional", promedio: 47, min: 20, max: 79 },
    { cargo: "Consejero nacional", promedio: 41, min: 18, max: 87 },
    { cargo: "Regidor provincial", promedio: 40, min: 18, max: 93 },
    { cargo: "Regidor distrital", promedio: 38, min: 18, max: 96 }
];

const educacionColumnasData = [
    { cargo: "Gob. Regional", "Primaria": 0.4, "Secundaria": 10.9, "Superior técnica": 2.7, "Superior universitaria": 41.4, "Posgrado **": 44.5, "Sin datos": 0.1 },
    { cargo: "Alc. Provincial", "Primaria": 0.6, "Secundaria": 19.2, "Superior técnica": 3.4, "Superior universitaria": 33.1, "Posgrado **": 30.5, "Sin datos": 13.2 },
    { cargo: "Alc. Distrital", "Primaria": 1.4, "Secundaria": 37.2, "Superior técnica": 3.9, "Superior universitaria": 35.0, "Posgrado **": 17.1, "Sin datos": 5.4 },
    { cargo: "Vicegob. Reg.", "Primaria": 0.3, "Secundaria": 14.1, "Superior técnica": 2.5, "Superior universitaria": 27.0, "Posgrado **": 32.8, "Sin datos": 23.3 },
    { cargo: "Cons. Nacional", "Primaria": 1.6, "Secundaria": 28.0, "Superior técnica": 2.2, "Superior universitaria": 25.4, "Posgrado **": 11.1, "Sin datos": 31.8 },
    { cargo: "Reg. Provincial", "Primaria": 2.9, "Secundaria": 42.2, "Superior técnica": 3.3, "Superior universitaria": 27.2, "Posgrado **": 8.8, "Sin datos": 15.6 },
    { cargo: "Reg. Distrital", "Primaria": 5.9, "Secundaria": 60.7, "Superior técnica": 2.7, "Superior universitaria": 19.1, "Posgrado **": 3.2, "Sin datos": 8.4 }
];

const carrerasData = [
    { label: "Ingeniería", abs: 17 },
    { label: "Educación", abs: 16 },
    { label: "Derecho", abs: 3 }
];

const partidosEdadData = [
    { partido: "Unidad y Paz", total: 1214, promedio: 45.987, max: 87 },
    { partido: "Apra", total: 1508, promedio: 45.293, max: 93 },
    { partido: "Obras", total: 734, promedio: 43.389, max: 89 },
    { partido: "PPC", total: 1391, promedio: 43.289, max: 89 },
    { partido: "SíCreo", total: 170, promedio: 43.274, max: 74 }
];

const partidosJovenesData = [
    { partido: "Partido Demócrata Verde", total: 160, jovenes: 53, pct: 33.1 },
    { partido: "Batalla Perú", total: 131, jovenes: 42, pct: 32.09 },
    { partido: "Perú Moderno", total: 810, jovenes: 259, pct: 31.98 },
    { partido: "Podemos Perú", total: 7292, jovenes: 2332, pct: 31.98 },
    { partido: "País Para Todos", total: 292, jovenes: 93, pct: 31.91 }
];

const partidosMayoresData = [
    { partido: "Apra", total: 1508, mayores: 372, pct: 24.67 },
    { partido: "Unidad y Paz", total: 1212, mayores: 250, pct: 20.66 },
    { partido: "PPC", total: 1391, mayores: 228, pct: 16.39 },
    { partido: "Unido Perú", total: 316, mayores: 49, pct: 15.51 },
    { partido: "Primero la Gente", total: 246, mayores: 38, pct: 15.45 }
];

const partidosMujeresData = [
    { partido: "Unido Perú", totalJovenes: 77, mujeres: 55, pct: 71.43 },
    { partido: "Frente de la Esperanza 2021", totalJovenes: 409, mujeres: 281, pct: 68.7 },
    { partido: "Perú Libre", totalJovenes: 190, mujeres: 130, pct: 68.42 },
    { partido: "Venceremos", totalJovenes: 596, mujeres: 406, pct: 68.12 },
    { partido: "Libertad Popular", totalJovenes: 518, mujeres: 346, pct: 66.8 }
];

// ==========================================
// 3. MOTOR DE RENDERIZADO D3
// ==========================================
function renderDonutChart() {
    try {
        const { width, height, margin } = CONFIG.svg;
        const radius = Math.min(width, height) / 2 - margin;

        const container = d3.select("#dashboard-educacion");
        container.selectAll("*").remove();

        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("max-width", "100%")
            .style("height", "auto")
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const pie = d3.pie()
            .sort(null) 
            .value(d => d.pct);

        const dataReady = pie(educacionData);

        const arc = d3.arc()
            .innerRadius(radius * 0.45) 
            .outerRadius(radius * 0.85);

        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        svg.selectAll("allSlices")
            .data(dataReady)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => CONFIG.colores[d.data.label] || "#333")
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0)
            .transition()
            .duration(CONFIG.animationSpeed)
            .style("opacity", 1);

        svg.selectAll("allPolylines")
            .data(dataReady)
            .enter()
            .append("polyline")
            .attr("class", "polyline-guide")
            .attr("points", function(d) {
                const posA = arc.centroid(d); 
                const posB = outerArc.centroid(d); 
                const posC = outerArc.centroid(d); 
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
                return [posA, posB, posC];
            })
            .style("opacity", 0)
            .transition()
            .delay(CONFIG.animationSpeed / 2)
            .duration(CONFIG.animationSpeed)
            .style("opacity", 1);

        const labelsGroup = svg.selectAll("allLabels")
            .data(dataReady)
            .enter()
            .append("g")
            .attr("transform", function(d) {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 1.02 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style("text-anchor", function(d) {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midangle < Math.PI ? "start" : "end");
            })
            .style("opacity", 0);

        labelsGroup.append("text")
            .attr("class", "label-category")
            .attr("y", -10)
            .text(d => d.data.label);

        labelsGroup.append("text")
            .attr("y", 8)
            .append("tspan")
            .attr("class", "label-percentage")
            .attr("fill", d => CONFIG.colores[d.data.label])
            .text(d => `${d.data.pct}% `)
            .append("tspan")
            .attr("class", "label-absolute")
            .text(d => `(${d.data.abs.toLocaleString('es-PE')} casos)`);

        labelsGroup.transition()
            .delay(CONFIG.animationSpeed / 2)
            .duration(CONFIG.animationSpeed)
            .style("opacity", 1);

    } catch (error) {
        console.error("Error al renderizar la visualización D3:", error);
        document.getElementById("chart-error-message").style.display = "block";
    }
}

function renderAgeCharts() {
    const width = 400, height = 300;
    const marginBar = { top: 20, right: 30, bottom: 30, left: 140 }; 
    const marginDumbbell = { top: 20, right: 40, bottom: 30, left: 20 }; 

    const yScale = d3.scaleBand()
        .domain(edadesData.map(d => d.cargo))
        .range([marginBar.top, height - marginBar.bottom])
        .padding(0.3);

    const svgBar = d3.select("#chart-edad-promedio").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%");

    const xScaleBar = d3.scaleLinear()
        .domain([0, 60]) 
        .range([marginBar.left, width - marginBar.right]);

    svgBar.append("g")
        .attr("transform", `translate(${marginBar.left},0)`)
        .call(d3.axisLeft(yScale).tickSize(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text").style("font-family", "Arial").style("font-size", "12px");

    svgBar.selectAll("rect")
        .data(edadesData)
        .enter().append("rect")
        .attr("y", d => yScale(d.cargo))
        .attr("x", marginBar.left)
        .attr("height", yScale.bandwidth())
        .attr("width", d => xScaleBar(d.promedio) - marginBar.left)
        .attr("fill", "#B2BABB");

    svgBar.selectAll(".label-promedio")
        .data(edadesData)
        .enter().append("text")
        .attr("class", "label-promedio")
        .attr("y", d => yScale(d.cargo) + yScale.bandwidth() / 2)
        .attr("x", d => xScaleBar(d.promedio) + 5)
        .attr("dominant-baseline", "middle")
        .style("font-family", "Arial").style("font-weight", "bold").style("font-size", "12px")
        .text(d => d.promedio);

    const svgDumbbell = d3.select("#chart-edad-rango").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%");

    const xScaleDumbbell = d3.scaleLinear()
        .domain([0, 100]) 
        .range([marginDumbbell.left, width - marginDumbbell.right]);

    svgDumbbell.append("g")
        .attr("transform", `translate(${marginDumbbell.left},0)`)
        .call(d3.axisLeft(yScale).tickSize(0).tickFormat(""))
        .call(g => g.select(".domain").remove());

    const groups = svgDumbbell.selectAll("g.dumbbell")
        .data(edadesData)
        .enter().append("g")
        .attr("class", "dumbbell")
        .attr("transform", d => `translate(0, ${yScale(d.cargo) + yScale.bandwidth() / 2})`);

    groups.append("line")
        .attr("class", "dumbbell-line")
        .attr("x1", d => xScaleDumbbell(d.min))
        .attr("x2", d => xScaleDumbbell(d.max))
        .attr("y1", 0)
        .attr("y2", 0);

    groups.append("circle")
        .attr("class", "dumbbell-circle-min")
        .attr("cx", d => xScaleDumbbell(d.min))
        .attr("cy", 0)
        .attr("r", 6);

    groups.append("circle")
        .attr("class", "dumbbell-circle-max")
        .attr("cx", d => xScaleDumbbell(d.max))
        .attr("cy", 0)
        .attr("r", 6);

    groups.append("text")
        .attr("class", "dumbbell-text")
        .attr("x", d => xScaleDumbbell(d.min) - 10)
        .attr("y", 4)
        .attr("text-anchor", "end")
        .style("font-family", "Arial")
        .style("font-size", "13px")
        .style("fill", "#333")
        .style("font-weight", "bold")
        .text(d => d.min);

    groups.append("text")
        .attr("class", "dumbbell-text")
        .attr("x", d => xScaleDumbbell(d.max) + 10)
        .attr("y", 4)
        .attr("text-anchor", "start")
        .style("font-family", "Arial")
        .style("font-size", "13px")
        .style("fill", "#333")
        .style("font-weight", "bold")
        .text(d => d.max);
}

function renderStackedColumns() {
    const container = d3.select("#chart-educacion-columnas");
    container.selectAll("*").remove();

    const width = 1000, height = 550; 
    const margin = { top: 40, right: 20, bottom: 80, left: 50 };

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto");

    const legendContainer = document.getElementById("unified-legend");
    const legendKeys = Object.keys(CONFIG.colores).filter(key => 
        !["Ingeniería", "Educación", "Derecho", "Universitaria", "Posgrado", "Técnica"].includes(key)
    ); 
    
    legendContainer.innerHTML = legendKeys.map(key => 
        `<div class="legend-pill">
            <div class="legend-color-box" style="background:${CONFIG.colores[key]};"></div>
            <span class="legend-label">${key}</span>
         </div>`
    ).join("");

    const gruposCargos = educacionColumnasData.map(d => d.cargo);
    const categorias = Object.keys(CONFIG.colores).filter(key => 
        !["Ingeniería", "Educación", "Derecho", "Universitaria", "Posgrado", "Técnica"].includes(key)
    );

    const stackedData = d3.stack()
        .keys(categorias)
        (educacionColumnasData);

    const xScale = d3.scaleBand()
        .domain(gruposCargos)
        .range([margin.left, width - margin.right])
        .padding(0.35); 

    const yScale = d3.scaleLinear()
        .domain([0, 100]) 
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat(d => d + "%").tickSize(-(width - margin.left - margin.right)))
        .call(g => g.select(".domain").remove()) 
        .call(g => g.selectAll(".tick line").attr("stroke", "#eaeaea").attr("stroke-dasharray", "4,4"))
        .selectAll("text").style("font-family", "Arial").style("font-size", "12px").style("fill", "#666");

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll("text")
        .attr("class", "axis-x-text")
        .attr("transform", "translate(-10, 5) rotate(-25)")
        .style("text-anchor", "end");

    const colorScale = d3.scaleOrdinal()
        .domain(categorias)
        .range(categorias.map(c => CONFIG.colores[c]));

    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", d => colorScale(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => xScale(d.data.cargo))
        .attr("y", d => yScale(d[1])) 
        .attr("height", d => yScale(d[0]) - yScale(d[1])) 
        .attr("width", xScale.bandwidth())
        .attr("opacity", 0)
        .transition()
        .duration(CONFIG.animationSpeed || 1000)
        .attr("opacity", 1);
}

function renderCarrerasDonut() {
    const width = 600, height = 400, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart-carreras").append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("max-width", "100%")
        .style("height", "auto")
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().sort(null).value(d => d.abs);
    const dataReady = pie(carrerasData);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);
    const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

    svg.selectAll("allSlices")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => CONFIG.colores[d.data.label] || "#333")
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    svg.selectAll("allPolylines")
        .data(dataReady)
        .enter()
        .append("polyline")
        .attr("class", "polyline-guide")
        .attr("points", function(d) {
            const posA = arc.centroid(d);
            const posB = outerArc.centroid(d);
            const posC = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
        });

    const labelsGroup = svg.selectAll("allLabels")
        .data(dataReady)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 1.02 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .style("text-anchor", function(d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? "start" : "end");
        });

    labelsGroup.append("text")
        .attr("class", "label-category")
        .attr("y", -5)
        .text(d => d.data.label);

    labelsGroup.append("text")
        .attr("y", 12)
        .attr("class", "label-percentage")
        .attr("fill", d => CONFIG.colores[d.data.label])
        .text(d => `${d.data.abs} partidos`);
}

function renderTop5BarChart(containerId, data, valueKey, formatLabelFn, tooltipHTMLFn, barColor) {
    const width = 600, height = 300;
    const margin = { top: 20, right: 40, bottom: 20, left: 200 }; 
    
    const svg = d3.select(containerId).append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%");

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[valueKey]) * 1.15]) 
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.partido))
        .range([margin.top, height - margin.bottom])
        .padding(0.3);

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickSize(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "13px")
        .style("font-weight", "bold")
        .style("fill", "#333");

    const tooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip")
        .style("opacity", 0);

    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", d => yScale(d.partido))
        .attr("x", margin.left)
        .attr("height", yScale.bandwidth())
        .attr("width", d => xScale(d[valueKey]) - margin.left)
        .attr("fill", barColor)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(tooltipHTMLFn(d))
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            tooltip.transition().duration(500).style("opacity", 0);
        });

    svg.selectAll(".bar-label")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("y", d => yScale(d.partido) + yScale.bandwidth() / 2)
        .attr("x", d => xScale(d[valueKey]) + 5)
        .attr("dominant-baseline", "middle")
        .style("font-family", "Arial")
        .style("font-weight", "bold")
        .style("font-size", "13px")
        .style("fill", barColor)
        .text(d => formatLabelFn(d[valueKey]));
}

// ==========================================
// NUEVO: SISTEMA DE DASHBOARD INTERACTIVO
// ==========================================
function initInteractiveDashboard() {
    Promise.all([
        d3.csv("dashboard_edades_TITULARES.csv"),
        d3.csv("PARTIDOS_NIVEL_MAXIMO_DASHBOARD.csv"),
        d3.csv("CARRERAS_PARTIDOS_DASHBOARD.csv")
    ]).then(function(files) {
        const rawEdades = files[0];
        const rawNivel = files[1];
        const rawCarreras = files[2];
        
        // Parsear strings a números
        rawEdades.forEach(d => {
            d['Edad Promedio'] = +d['Edad Promedio'];
            d['Edad Mínima'] = +d['Edad Mínima'];
            d['Edad Máxima'] = +d['Edad Máxima'];
        });
        rawNivel.forEach(d => {
            d['N Candidatos'] = +d['N Candidatos'];
            d['% del total'] = +d['% del total'];
        });
        rawCarreras.forEach(d => {
            d['N Candidatos'] = +d['N Candidatos'];
            d['% del total'] = +d['% del total'];
        });

        // Llenar el input tipo dropdown
        const parties = Array.from(new Set(rawEdades.map(d => d.Partido))).sort();
        const dataList = d3.select("#party-list");
        parties.forEach(p => {
            dataList.append("option").attr("value", p);
        });

        // Estado inicial
        let currentState = {
            partido: parties.includes("APP") ? "APP" : parties[0],
            nivel: "GENERAL"
        };

        d3.select("#party-selector").property("value", currentState.partido);

        // Listeners
        d3.select("#party-selector").on("change", function() {
            const val = this.value;
            if(parties.includes(val)) {
                currentState.partido = val;
                updateDashboard();
            }
        });

        d3.selectAll(".toggle-btn").on("click", function() {
            d3.selectAll(".toggle-btn").classed("active", false);
            d3.select(this).classed("active", true);
            currentState.nivel = d3.select(this).attr("data-level");
            updateDashboard();
        });

        // Motor de actualización
        function updateDashboard() {
            const edadData = rawEdades.find(d => d.Partido === currentState.partido && d['Nivel de Gobierno'] === currentState.nivel);
            const nivelData = rawNivel.filter(d => d.Partido === currentState.partido && d['Nivel de Gobierno'] === currentState.nivel);
            
            let carreraData = rawCarreras.filter(d => d.Partido === currentState.partido && d['Nivel de Gobierno'] === currentState.nivel);
            // Ordenar por más candidatos y sacar top 7
            carreraData = carreraData.sort((a, b) => b['N Candidatos'] - a['N Candidatos']).slice(0, 7);

            // Actualizar Tarjetas KPI
            if(edadData) {
                d3.select("#kpi-edad-promedio").text(edadData['Edad Promedio'].toFixed(1));
                d3.select("#kpi-edad-maxima").text(edadData['Edad Máxima']);
                d3.select("#kpi-edad-minima").text(edadData['Edad Mínima']);
            } else {
                d3.select("#kpi-edad-promedio").text("-");
                d3.select("#kpi-edad-maxima").text("-");
                d3.select("#kpi-edad-minima").text("-");
            }

            // Actualizar Gráficos
            renderInteractiveBarChart(carreraData);
            renderInteractiveDonutChart(nivelData);
        }

        updateDashboard();
    }).catch(error => {
        console.error("Error al cargar los CSV del dashboard interactivo:", error);
    });
}

// Renderizadores de Gráficos Internos del Dashboard
function renderInteractiveBarChart(data) {
    const container = d3.select("#interactive-bar-chart");
    container.selectAll("*").remove();

    if (!data || data.length === 0) {
        container.append("p").text("Sin datos para este nivel.").style("text-align", "center").style("font-family", "Arial").style("color", "#666");
        return;
    }

    const width = 500, height = 300;
    const margin = { top: 20, right: 40, bottom: 20, left: 200 }; // Espacio amplio para profesiones largas
    
    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%");

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['N Candidatos']) * 1.15])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d['Profesion Clasificada']))
        .range([margin.top, height - margin.bottom])
        .padding(0.25);

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickSize(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("fill", "#333");

    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", d => yScale(d['Profesion Clasificada']))
        .attr("x", margin.left)
        .attr("height", yScale.bandwidth())
        .attr("width", d => xScale(d['N Candidatos']) - margin.left)
        .attr("fill", "#2E4053");

    svg.selectAll(".bar-label")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("y", d => yScale(d['Profesion Clasificada']) + yScale.bandwidth() / 2)
        .attr("x", d => xScale(d['N Candidatos']) + 5)
        .attr("dominant-baseline", "middle")
        .style("font-family", "Arial")
        .style("font-weight", "bold")
        .style("font-size", "11px")
        .style("fill", "#2E4053")
        .text(d => d['N Candidatos']);
}

function renderInteractiveDonutChart(data) {
    const container = d3.select("#interactive-donut-chart");
    container.selectAll("*").remove();

    if (!data || data.length === 0) {
        container.append("p").text("Sin datos para este nivel.").style("text-align", "center").style("font-family", "Arial").style("color", "#666");
        return;
    }

    const width = 450, height = 300, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto")
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().sort(null).value(d => d['N Candidatos']);
    const dataReady = pie(data);

    const arc = d3.arc().innerRadius(radius * 0.45).outerRadius(radius * 0.85);
    const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

    svg.selectAll("allSlices")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => CONFIG.colores[d.data['Nivel Máximo']] || "#333")
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    svg.selectAll("allPolylines")
        .data(dataReady)
        .enter()
        .append("polyline")
        .attr("class", "polyline-guide")
        .attr("points", function(d) {
            const posA = arc.centroid(d); 
            const posB = outerArc.centroid(d); 
            const posC = outerArc.centroid(d); 
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
            return [posA, posB, posC];
        });

    const labelsGroup = svg.selectAll("allLabels")
        .data(dataReady)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 1.05 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .style("text-anchor", function(d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midangle < Math.PI ? "start" : "end");
        });

    labelsGroup.append("text")
        .attr("class", "label-category")
        .attr("y", -5)
        .style("font-size", "11px")
        .text(d => d.data['Nivel Máximo']);

    labelsGroup.append("text")
        .attr("y", 10)
        .attr("class", "label-percentage")
        .attr("fill", d => CONFIG.colores[d.data['Nivel Máximo']] || "#333")
        .style("font-size", "12px")
        .text(d => `${d.data['% del total'].toFixed(1)}%`);
}

// Inicializador principal
document.addEventListener("DOMContentLoaded", () => {
    // Gráficos Estáticos
    renderDonutChart(); 
    renderAgeCharts(); 
    renderStackedColumns();
    renderCarrerasDonut();
    
    renderTop5BarChart("#chart-edad-partidos", partidosEdadData, "promedio", (val) => val.toFixed(1), (d) => `<b>Edad Máxima:</b> ${d.max} años`, "#7B241C");
    renderTop5BarChart("#chart-jovenes-partidos", partidosJovenesData, "pct", (val) => val + "%", (d) => `<b>Jóvenes (18-29):</b> ${d.jovenes}`, "#117A65");
    renderTop5BarChart("#chart-mayores-partidos", partidosMayoresData, "pct", (val) => val + "%", (d) => `<b>Adultos Mayores (61+):</b> ${d.mayores}`, "#2E4053");
    renderTop5BarChart("#chart-mujeres-partidos", partidosMujeresData, "pct", (val) => val + "%", (d) => `<b>Mujeres jóvenes:</b> ${d.mujeres}<br><b>Total jóvenes en el partido:</b> ${d.totalJovenes}`, "#D68910");

    // Gráficos Interactivos desde CSV local (Requiere Live Server)
    initInteractiveDashboard();
});