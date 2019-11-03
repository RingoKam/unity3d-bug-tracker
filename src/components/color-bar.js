//styles
const colorBarButtonStyle = {
    width: '100%',
    display: "flex",
    padding: "0 0 0 0",
    border: "none",
    cursor: "pointer"
}

export const ColorBar = ({ data }) => {
    const totalIssue = data.length;
    const dataWithColorInfo = data.map(row => {
        const colorType = getColorType(row.status);
        return { ...row, colorType }
    });
    const groupedByColor = groupBy(dataWithColorInfo, "colorType");
    const result = Object.keys(groupedByColor).map(colorType => {
        const color = getColor(colorType);
        const percent = limitStringLength((groupedByColor[colorType].length / totalIssue) * 100, 0);
        return {
            percent,
            color,
            style: {
                'width': percent + "%",
                'backgroundColor': color,
                'height': "25px",
                'text-align': "center",
                'overflow': "hidden",
                'color': "white",
                'font-size': "20px"
            }
        }
    }).sort((a, b) => a.color > b.color);

    const getColorSpan = (f) => {
        return (<span key={f.status} title={f.status} style={f.style}>{f.percent + "%"}</span>)
    }

    return (
        <button style={colorBarButtonStyle}>
            {result.map(getColorSpan)}
        </button>
    )
}