import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import { Root, Td, Row, Th, Pagination } from './TableStyled';

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  getIsPaginationShow = () =>
    this.props.pageSize !== Infinity && this.props.pageSize < this.props.data.length;

  handleChangePage = i => () => {
    this.setState({
      page: i,
    });
  }

  renderHeader() {
    const { cols } = this.props;
    const headerCols = cols.map(({ key, title, width }, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Th key={`${key}-${i}`} width={width}>{title}</Th>
    ));
    return (
      <Row>
        {headerCols}
      </Row>
    );
  }

  renderRows() {
    const { data, cols, pageSize } = this.props;
    const { page } = this.state;
    const isPaginationShow = this.getIsPaginationShow();
    let viewedData = data;
    if (isPaginationShow) {
      viewedData = viewedData.slice(pageSize * (page - 1), pageSize * page);
    }
    const rows = viewedData.map((row) => {
      const rowCols = cols.map((col, idx) => {
        let value = row[col.key];
        if (col.render && typeof col.render === 'function') {
          value = col.render({ value });
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Td key={`${col.key}-${row.id}-${idx}`}>{value}</Td>
        );
      });
      return (
        <Row key={row.id}>
          {rowCols}
        </Row>
      );
    });

    return rows;
  }

  renderPagination() {
    const { data, pageSize } = this.props;
    const { page } = this.state;
    const pageCount = Math.round(data.length / pageSize);
    const buttons = [];
    for (let i = 1; i < pageCount + 1; i += 1) {
      buttons.push(
        <Button
          type="primary"
          size="small"
          isActive={i === page}
          isDisable={i === page}
          onClick={this.handleChangePage(i)}
        >
          {i}
        </Button>,
      );
    }
    return (
      <Pagination>{buttons}</Pagination>
    );
  }

  render() {
    const isPaginationShow = this.getIsPaginationShow();
    return (
      <Fragment>
        <Root>
          <tbody>
            {this.renderHeader()}
            <Fragment>
              {this.renderRows()}
            </Fragment>
          </tbody>
        </Root>
        {isPaginationShow && this.renderPagination()}
      </Fragment>
    );
  }
}

Table.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
};

Table.defaultProps = {
  pageSize: Infinity,
};

export default Table;
