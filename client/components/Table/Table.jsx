import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import Loader from 'components/icons/Loader';
import { Root, Tbl, Td, Row, Th, Pagination, LoaderBox } from './TableStyled';

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  getIsPaginationShow = () =>
    this.props.pageSize !== Infinity && this.props.pageSize < this.props.data.length;

  getSortedData = () => {
    const { data } = this.props;
    return data.sort((a, b) => b.date - a.date);
  }

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
    const { cols, pageSize, isLoading } = this.props;
    const data = this.getSortedData();
    const isPaginationShow = this.getIsPaginationShow();
    if (isLoading) {
      if (pageSize !== Infinity) {
        const rows = [];
        for (let i = 0; i < pageSize; i += 1) {
          const emptyCols = [];
          for (let y = 0; y < cols.length; y += 1) {
            emptyCols.push(<Td key={y} />);
          }
          rows.push(<Row key={i}>{emptyCols}</Row>);
        }
        return rows;
      }
      return [];
    }
    const { page } = this.state;
    let viewedData = data;
    if (isPaginationShow) {
      viewedData = viewedData.slice(pageSize * (page - 1), pageSize * page);
    }
    const rows = viewedData.map((row) => {
      const rowCols = cols.map((col, idx) => {
        let value = row[col.key];
        if (col.render && typeof col.render === 'function') {
          value = col.render({ value, item: row });
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

  renderEmpty() {
    const { cols } = this.props;
    return (
      <Row key="emptyRow">
        <Td colSpan={cols.length}>Have no records yet.</Td>
      </Row>
    );
  }

  renderPagination() {
    const { data, pageSize } = this.props;
    const { page } = this.state;
    const pageCount = Math.ceil(data.length / pageSize);
    const buttons = [];
    for (let i = 1; i < pageCount + 1; i += 1) {
      buttons.push(
        <Button
          key={i}
          type="primary"
          size="small"
          isActive={i === page}
          disabled={i === page}
          onClick={this.handleChangePage(i)}
        >
          {i}
        </Button>,
      );
    }
    return (
      <Pagination>
        {buttons}
      </Pagination>
    );
  }

  render() {
    const { isLoading, data } = this.props;
    const isPaginationShow = this.getIsPaginationShow();
    return (
      <Root>
        {isLoading && (
          <LoaderBox>
            <Loader width="50px" />
          </LoaderBox>
        )}
        <Tbl>
          <tbody>
            {this.renderHeader()}
            {data.length && this.renderRows()}
            {!data.length && this.renderEmpty()}
          </tbody>
        </Tbl>
        {isPaginationShow && this.renderPagination()}
      </Root>
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
  isLoading: PropTypes.bool,
};

Table.defaultProps = {
  pageSize: Infinity,
  isLoading: false,
};

export default Table;
