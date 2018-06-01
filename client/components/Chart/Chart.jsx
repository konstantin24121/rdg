import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Root, Canvas } from './ChartStyled';

const BORDER_OFFSET = 4;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  drawBorder = ({ ctx, width, height }) => {
    ctx.strokeStyle = '#7a7a7a';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      BORDER_OFFSET - 0.5,
      0.5,
      width,
      height - 1,
    );
  }

  drawLinesAndLabels = ({ ctx, width, height }) => {
    const { xKeys, yKeys } = this.props;
    const realWidth = width + BORDER_OFFSET;
    const labelYOffset = 6;
    const labelXOffset = 4;
    const yAxisLabelLine = realWidth + labelYOffset;
    const xAxisLabelLine = height + labelXOffset;
    const xNumber = xKeys.length - 1;
    const yNumber = yKeys.length - 1;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#cccccc';
    const verticalStep = Math.round(width / xNumber);
    const horizontalStep = Math.round(height / yNumber);

    ctx.fillText(yKeys[0].label, yAxisLabelLine, 10);
    ctx.textBaseline = 'middle';
    for (let i = 1; i < yNumber; i += 1) {
      ctx.beginPath();
      ctx.moveTo(BORDER_OFFSET, (horizontalStep * i) - 0.5);
      ctx.lineTo(realWidth, (horizontalStep * i) - 0.5);
      ctx.stroke();
      ctx.fillText(yKeys[i].label, yAxisLabelLine, (horizontalStep * i) - 0.5);
    }
    ctx.textBaseline = 'bottom';
    ctx.fillText(yKeys[yKeys.length - 1].label, yAxisLabelLine, height);

    ctx.textBaseline = 'top';
    ctx.fillText(xKeys[0].label, BORDER_OFFSET, xAxisLabelLine);
    ctx.textAlign = 'center';
    for (let i = 1; i < xNumber; i += 1) {
      ctx.beginPath();
      ctx.moveTo((verticalStep * i) - 0.5, 0);
      ctx.lineTo((verticalStep * i) - 0.5, height);
      ctx.stroke();
      ctx.fillText(xKeys[i].label, (verticalStep * i) - 0.5, xAxisLabelLine);
    }
    ctx.textAlign = 'right';
    ctx.fillText(xKeys[xKeys.length - 1].label, realWidth, xAxisLabelLine);
  }

  drawLine = ({ ctx, width, height }) => {
    const { xKeys, yKeys, data, dataKeyX, dataKeyY } = this.props;
    const xStep = (xKeys[xKeys.length - 1].value - xKeys[0].value) / width;
    const yStep = (yKeys[yKeys.length - 1].value - yKeys[0].value) / height;

    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 4;
    for (let i = 0; i < data.length; i += 1) {
      const point = data[i];
      const x = (point[dataKeyX] - xKeys[0].value) / xStep;
      const y = (point[dataKeyY] - yKeys[0].value) / yStep;

      if (i + 1 < data.length) {
        const nextPoint = data[i + 1];
        ctx.beginPath();
        const nextX = (nextPoint[dataKeyX] - xKeys[0].value) / xStep;
        const nextY = (nextPoint[dataKeyY] - yKeys[0].value) / yStep;
        let realX = nextX;
        let realY = nextY;
        if (nextX < BORDER_OFFSET) {
          realX = BORDER_OFFSET;
          const a = (nextY - y) / (nextX - x);
          realY = nextY - (a * nextX);
        }
        ctx.moveTo(x, y);
        ctx.lineTo(realX, realY);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  updateCanvas() {
    const canvas = this.canvasRef.current;
    canvas.width = this.rootRef.current.getClientRects()[0].width;
    canvas.height = this.props.chartHeight;
    const { width: canvasWidth, height: canvasHeight } = canvas;
    const realWidth = canvasWidth - (BORDER_OFFSET * 2) - 40;
    const realHeight = canvasHeight - 20;

    const ctx = this.canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = '14px Helvetica';

    this.drawLinesAndLabels({
      ctx,
      width: realWidth,
      height: realHeight,
    });

    this.drawBorder({
      ctx,
      width: realWidth,
      height: realHeight,
    });

    this.drawLine({
      ctx,
      width: realWidth,
      height: realHeight,
    });
  }

  render() {
    const { chartHeight } = this.props;
    return (
      <Root innerRef={this.rootRef}>
        <Canvas
          innerRef={this.canvasRef}
          height={chartHeight}
        />
      </Root>
    );
  }
}

const keyShape = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  }),
);

const dataShape = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }),
);

Chart.propTypes = {
  dataKeyX: PropTypes.string.isRequired,
  dataKeyY: PropTypes.string.isRequired,
  yKeys: keyShape.isRequired,
  xKeys: keyShape.isRequired,
  data: dataShape.isRequired,
  chartHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Chart.defaultProps = {
  chartHeight: '200',
};

export default Chart;
