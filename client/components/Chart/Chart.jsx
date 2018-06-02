import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Loader from 'components/icons/Loader';
import { Root, Canvas, LoaderBox, TestLabel } from './ChartStyled';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.rootRef = React.createRef();
    this.labelYCheckRef = React.createRef();
    this.labelXCheckRef = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  drawBorder = ({ ctx, width, height }) => {
    const { theme } = this.props;
    ctx.strokeStyle = theme.gray500;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      theme.chartOffset - 0.5,
      0.5,
      width,
      height - 1,
    );
  }

  drawLinesAndLabels = ({ ctx, width, height }) => {
    const { xKeys, yKeys, theme } = this.props;
    const realWidth = width + theme.chartOffset;
    const yAxisLabelLine = realWidth + theme.chartYAxisOffset;
    const xAxisLabelLine = height + theme.chartXAxisOffset;
    const xNumber = xKeys.length - 1;
    const yNumber = yKeys.length - 1;
    ctx.lineWidth = 1;
    ctx.strokeStyle = theme.gray300;
    const verticalStep = Math.round(width / xNumber);
    const horizontalStep = Math.round(height / yNumber);
    if (yKeys.length) {
      ctx.fillText(yKeys[0].label, yAxisLabelLine, 10);
      ctx.textBaseline = 'middle';
      for (let i = 1; i < yNumber; i += 1) {
        ctx.beginPath();
        ctx.moveTo(theme.chartOffset, (horizontalStep * i) - 0.5);
        ctx.lineTo(realWidth, (horizontalStep * i) - 0.5);
        ctx.stroke();
        ctx.fillText(yKeys[i].label, yAxisLabelLine, (horizontalStep * i) - 0.5);
      }
      ctx.textBaseline = 'bottom';
      ctx.fillText(yKeys[yKeys.length - 1].label, yAxisLabelLine, height);
    }
    if (xKeys.length) {
      ctx.textBaseline = 'top';
      ctx.fillText(xKeys[0].label, theme.chartOffset, xAxisLabelLine);
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
  }

  drawLine = ({ ctx, width, height }) => {
    const { xKeys, yKeys, data, dataKeyX, dataKeyY, theme } = this.props;
    if (!data.length) return null;

    const xStep = (xKeys[xKeys.length - 1].value - xKeys[0].value) / width;
    const yStep = (yKeys[yKeys.length - 1].value - yKeys[0].value) / height;

    ctx.fillStyle = 'black';
    ctx.strokeStyle = theme.blue500;
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
        if (nextX < theme.chartOffset) {
          realX = theme.chartOffset;
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
    return null;
  };

  updateCanvas() {
    const { theme } = this.props;
    const canvas = this.canvasRef.current;
    canvas.width = this.rootRef.current.getClientRects()[0].width;
    canvas.height = this.props.chartHeight;
    const labelWidth = this.labelYCheckRef.current ? this.labelYCheckRef.current.clientWidth : 0;
    const labelHeight = this.labelXCheckRef.current ? this.labelXCheckRef.current.clientHeight : 0;
    const { width: canvasWidth, height: canvasHeight } = canvas;
    const chartWidth = canvasWidth - (theme.chartOffset * 2) - labelWidth - theme.chartYAxisOffset;
    const realHeight = canvasHeight - labelHeight - theme.chartXAxisOffset;

    const ctx = this.canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = `${theme.fontSizeBase} ${theme.fontFamily}`;

    this.drawLinesAndLabels({
      ctx,
      width: chartWidth,
      height: realHeight,
    });

    this.drawBorder({
      ctx,
      width: chartWidth,
      height: realHeight,
    });

    this.drawLine({
      ctx,
      width: chartWidth,
      height: realHeight,
    });
  }

  render() {
    const { chartHeight, isLoading, yKeys, xKeys } = this.props;
    return (
      <Root innerRef={this.rootRef} height={chartHeight}>
        {!isLoading && (
          <Fragment>
            <TestLabel innerRef={this.labelYCheckRef}>{yKeys[0].label}</TestLabel>
            <TestLabel innerRef={this.labelXCheckRef}>{xKeys[0].label}</TestLabel>
          </Fragment>
        )}
        {isLoading && (
          <LoaderBox>
            <Loader width="50px" />
          </LoaderBox>
        )}
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
  isLoading: PropTypes.bool,
  theme: PropTypes.object,
};

Chart.defaultProps = {
  chartHeight: '200',
  isLoading: false,
};

export default withTheme(Chart);
