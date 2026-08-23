// ==========================================
// 1. PANEL DE CONFIGURACIÓN MODULAR (CONFIG)
// ==========================================
const CONFIG = {
    colores: {
        "Posgrado **": "#d65442",            
        "Posgrado": "#d65442",
        "Superior universitaria": "#d86a4a", 
        "Universitaria": "#d86a4a",
        "Superior técnica": "#d56d73",
        "Técnica": "#d56d73",
        "Secundaria": "#df817c",             
        "Primaria": "#e9aaa1",               
        "Sin datos": "#7F8C8D" // Gris de contingencia solicitado
    },
    svg: {
        width: 800,
        height: 500,
        margin: 60 
    },
    animationSpeed: 1000
};

// ==========================================
// TOOLTIP GLOBAL
// ==========================================
let globalTooltip = d3.select("body").select(".d3-tooltip");
if (globalTooltip.empty()) {
    globalTooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip")
        .style("opacity", 0);
}

function showTooltip(event, content) {
    globalTooltip.transition().duration(200).style("opacity", 1);
    globalTooltip.html(content)
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 28) + "px");
}

function hideTooltip() {
    globalTooltip.transition().duration(500).style("opacity", 0);
}

// ==========================================
// 2. DATA
// ==========================================
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
        .attr("fill", "#e9aaa1")
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            showTooltip(event, `<b>${d.cargo}</b><br>Promedio: ${d.promedio}`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            hideTooltip();
        });

    svgBar.selectAll(".label-promedio")
        .data(edadesData)
        .enter().append("text")
        .attr("class", "label-promedio")
        .attr("y", d => yScale(d.cargo) + yScale.bandwidth() / 2)
        .attr("x", d => xScaleBar(d.promedio) + 12)
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
        .attr("r", 6)
        .style("fill", "#df817c")
        .on("mouseover", function(event, d) {
            showTooltip(event, `<b>Edad mínima:</b> ${d.min}`);
        })
        .on("mouseout", hideTooltip);

    groups.append("circle")
        .attr("class", "dumbbell-circle-max")
        .attr("cx", d => xScaleDumbbell(d.max))
        .attr("cy", 0)
        .attr("r", 6)
        .style("fill", "#d65442")
        .on("mouseover", function(event, d) {
            showTooltip(event, `<b>Edad máxima:</b> ${d.max}`);
        })
        .on("mouseout", hideTooltip);

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
        !["Universitaria", "Posgrado", "Técnica"].includes(key)
    ); 
    
    legendContainer.innerHTML = legendKeys.map(key => 
        `<div class="legend-pill">
            <div class="legend-color-box" style="background:${CONFIG.colores[key]};"></div>
            <span class="legend-label">${key}</span>
         </div>`
    ).join("");

    const gruposCargos = educacionColumnasData.map(d => d.cargo);
    const categorias = legendKeys;

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
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            const parentKey = d3.select(this.parentNode).datum().key;
            const percentage = (d[1] - d[0]).toFixed(1);
            showTooltip(event, `<b>${d.data.cargo}</b><br>${parentKey}: ${percentage}%`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            hideTooltip();
        })
        .attr("opacity", 0)
        .transition()
        .duration(CONFIG.animationSpeed || 1000)
        .attr("opacity", 1);
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
            showTooltip(event, tooltipHTMLFn(d));
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            hideTooltip();
        });

    svg.selectAll(".bar-label")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("y", d => yScale(d.partido) + yScale.bandwidth() / 2)
        .attr("x", d => xScale(d[valueKey]) + 12)
        .attr("dominant-baseline", "middle")
        .style("font-family", "Arial")
        .style("font-weight", "bold")
        .style("font-size", "13px")
        .style("fill", barColor)
        .text(d => formatLabelFn(d[valueKey]));
}

// ==========================================
// NUEVO GRÁFICO: BARRAS VERTICALES TIPO FLOURISH
// ==========================================
function renderInteractiveColumnChart(data) {
    const container = d3.select("#interactive-column-chart");
    container.selectAll("*").remove();

    if (!data || data.length === 0) {
        container.append("p").text("Sin datos para este nivel.").style("text-align", "center").style("font-family", "Arial").style("color", "#666");
        return;
    }

    const width = 450, height = 360;
    const margin = { top: 30, right: 10, bottom: 60, left: 40 };

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto");

    // Orden corregido según los valores exactos del CSV de Nivel Máximo
    const order = ["Sin datos", "Primaria", "Secundaria", "Técnica", "Universitaria", "Posgrado"];
    
    // Filtramos y ordenamos la data
    const sortedData = [...data].sort((a, b) => order.indexOf(a['Nivel Máximo']) - order.indexOf(b['Nivel Máximo']));

    const xScale = d3.scaleBand()
        .domain(sortedData.map(d => d['Nivel Máximo']))
        .range([margin.left, width - margin.right])
        .padding(0.15);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(sortedData, d => d['N Candidatos']) * 1.2])
        .range([height - margin.bottom, margin.top]);

    // Líneas de cuadrícula horizontales (Grid) y Eje Y
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-(width - margin.left - margin.right)))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").attr("stroke", "#eaeaea"))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "11px")
        .style("fill", "#888")
        .text(d => d.toLocaleString('es-PE'));

    // Eje X con separación de palabras largas
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));
        
    xAxis.select(".domain").attr("stroke", "#eaeaea");
    
    xAxis.selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "12px")
        .style("fill", "#666")
        .each(function(d) {
            const textNode = d3.select(this);
            const words = d.split(" ");
            textNode.text("");
            words.forEach((word, i) => {
                textNode.append("tspan")
                    .text(word)
                    .attr("x", 0)
                    .attr("y", 12)
                    .attr("dy", `${i * 1.1}em`);
            });
        });

    // Barras
    svg.selectAll("rect.bar")
        .data(sortedData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d['Nivel Máximo']))
        .attr("y", d => yScale(d['N Candidatos']))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin.bottom - yScale(d['N Candidatos']))
        .attr("fill", d => CONFIG.colores[d['Nivel Máximo']] || "#d65442")
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            showTooltip(event, `<b>${d['Nivel Máximo']}</b><br>Candidatos: ${d['N Candidatos']}<br>Porcentaje: ${d['% del total'].toFixed(1)}%`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            hideTooltip();
        });

    // Etiquetas numéricas encima de cada barra
    svg.selectAll("text.bar-value")
        .data(sortedData)
        .enter().append("text")
        .attr("class", "bar-value")
        .attr("x", d => xScale(d['Nivel Máximo']) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d['N Candidatos']) - 8)
        .attr("text-anchor", "middle")
        .style("font-family", "Arial")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#333")
        .text(d => d['N Candidatos'].toLocaleString('es-PE'));
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
        
        // Función ultra-robusta para leer las columnas (ignora caracteres extraños de Excel)
        const getVal = (row, colName) => {
            const key = Object.keys(row).find(k => k.includes(colName));
            return key ? row[key] : null;
        };

        const rawEdades = files[0];
        const rawNivel = files[1];
        const rawCarreras = files[2];
        
        // Extraemos los partidos reales del CSV y los ordenamos
        const parties = Array.from(new Set(rawEdades.map(d => getVal(d, "Partido")).filter(Boolean))).sort();
        
        // Llenamos el Datalist oculto (el menú desplegable)
        const dataList = d3.select("#party-list");
        dataList.selectAll("*").remove(); 
        parties.forEach(p => {
            dataList.append("option").attr("value", p);
        });

        // Estado inicial
        let currentState = {
            partido: parties.includes("APP") ? "APP" : (parties[0] || ""),
            nivel: "GENERAL"
        };

        const selector = d3.select("#party-selector");
        selector.property("value", currentState.partido);

        // TRUCO DE USABILIDAD: Al hacer clic, se borra el texto para que aparezca toda la lista junta
        selector.on("focus", function() {
            this.value = ""; 
        });

        // Cuando el usuario escribe o selecciona algo en la lista
        selector.on("input", function() {
            const typedVal = this.value.trim().toLowerCase();
            const matchedParty = parties.find(p => p.toLowerCase() === typedVal);
            
            // Solo actualizamos los gráficos si la palabra coincide con un partido real
            if(matchedParty) {
                currentState.partido = matchedParty;
                selector.property("value", matchedParty); // Autocompleta bonito
                updateDashboard();
            }
        });

        // Para salir del input si el usuario hizo clic pero no quiso cambiar nada
        selector.on("blur", function() {
            if (this.value === "") {
                this.value = currentState.partido;
            }
        });

        d3.selectAll(".toggle-btn").on("click", function() {
            d3.selectAll(".toggle-btn").classed("active", false);
            d3.select(this).classed("active", true);
            currentState.nivel = d3.select(this).attr("data-level");
            updateDashboard();
        });

        function updateDashboard() {
            const edadData = rawEdades.find(d => getVal(d, "Partido") === currentState.partido && getVal(d, "Nivel de Gobierno") === currentState.nivel);
            const nivelData = rawNivel.filter(d => getVal(d, "Partido") === currentState.partido && getVal(d, "Nivel de Gobierno") === currentState.nivel);
            
            let carreraData = rawCarreras.filter(d => getVal(d, "Partido") === currentState.partido && getVal(d, "Nivel de Gobierno") === currentState.nivel);
            
            // Limpiar y parsear números antes de renderizar
            carreraData.forEach(d => { d['N Candidatos'] = +getVal(d, 'N Candidatos'); });
            nivelData.forEach(d => { 
                d['N Candidatos'] = +getVal(d, 'N Candidatos'); 
                d['% del total'] = +getVal(d, '% del total'); 
                d['Nivel Máximo'] = getVal(d, 'Nivel Máximo');
            });

            carreraData = carreraData.sort((a, b) => b['N Candidatos'] - a['N Candidatos']).slice(0, 7);
            
            // Renombrar la columna de profesiones para que el gráfico la entienda
            carreraData.forEach(d => { d['Profesion Clasificada'] = getVal(d, 'Profesion Clasificada'); });

            if(edadData) {
                d3.select("#kpi-edad-promedio").text((+getVal(edadData, 'Edad Promedio')).toFixed(1));
                d3.select("#kpi-edad-maxima").text(getVal(edadData, 'Edad Máxima'));
                d3.select("#kpi-edad-minima").text(getVal(edadData, 'Edad Mínima'));
            } else {
                d3.select("#kpi-edad-promedio").text("-");
                d3.select("#kpi-edad-maxima").text("-");
                d3.select("#kpi-edad-minima").text("-");
            }

            renderInteractiveBarChart(carreraData);
            renderInteractiveColumnChart(nivelData);
        }

        updateDashboard();
    }).catch(error => {
        console.error("Error al cargar los CSV del dashboard interactivo:", error);
    });
}

function renderInteractiveBarChart(data) {
    const container = d3.select("#interactive-bar-chart");
    container.selectAll("*").remove();

    if (!data || data.length === 0) {
        container.append("p").text("Sin datos para este nivel.").style("text-align", "center").style("font-family", "Arial").style("color", "#666");
        return;
    }

    const width = 450, height = 360;
    const margin = { top: 20, right: 5, bottom: 20, left: 120 };
    
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
        .attr("fill", "#d65442") 
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            showTooltip(event, `<b>${d['Profesion Clasificada']}</b><br>Candidatos: ${d['N Candidatos']}`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            hideTooltip();
        });

    svg.selectAll(".bar-label")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("y", d => yScale(d['Profesion Clasificada']) + yScale.bandwidth() / 2)
        .attr("x", d => xScale(d['N Candidatos']) + 12)
        .attr("dominant-baseline", "middle")
        .style("font-family", "Arial")
        .style("font-weight", "bold")
        .style("font-size", "11px")
        .style("fill", "#d65442") 
        .text(d => d['N Candidatos']);
}

// Inicializador principal
document.addEventListener("DOMContentLoaded", () => {
    // Gráficos Estáticos restantes
    renderAgeCharts(); 
    renderStackedColumns();
    
    // Top 5 con la nueva paleta de colores
    renderTop5BarChart("#chart-edad-partidos", partidosEdadData, "promedio", (val) => val.toFixed(1), (d) => `<b>Edad Máxima:</b> ${d.max} años`, "#d65442");
    renderTop5BarChart("#chart-jovenes-partidos", partidosJovenesData, "pct", (val) => val + "%", (d) => `<b>Jóvenes (18-29):</b> ${d.jovenes}`, "#d86a4a");
    renderTop5BarChart("#chart-mayores-partidos", partidosMayoresData, "pct", (val) => val + "%", (d) => `<b>Adultos Mayores (61+):</b> ${d.mayores}`, "#d56d73");
    renderTop5BarChart("#chart-mujeres-partidos", partidosMujeresData, "pct", (val) => val + "%", (d) => `<b>Mujeres jóvenes:</b> ${d.mujeres}<br><b>Total jóvenes en el partido:</b> ${d.totalJovenes}`, "#df817c");

    // Gráficos Interactivos desde CSV local
    initInteractiveDashboard();
});