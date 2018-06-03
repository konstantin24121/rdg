import * as React from 'react';
import { format } from 'date-fns';
import { INTERFACES as dealsInterfaces } from 'redux/modules/deals';
import { Table, Button, } from 'components';
import CrossIcon from 'components/icons/cross.svg';
import LoaderIcon from 'components/icons/loader.svg';

import { RemoveBtnBox } from './DealsTableStyled';

import { IColRender } from 'components/Table';

interface Props {
  data: dealsInterfaces.Deal[],
  isDataLoading: boolean,
  onRemove: (id: number) => void,
}

class DealsTable extends React.Component<Props> {
  handleRemove = (id: number) => () => {
    this.props.onRemove(id);
  }

  render() {
    const { isDataLoading, data } = this.props;
    return (
      <Table
        cols={[
          {
            title: 'ID',
            key: 'id',
            width: '10%',
          },
          {
            title: 'Date',
            key: 'date',
            width: '30%',
            render: ({ value }: IColRender) => (format(value, 'MMM D, YYYY HH:mm:ss')),
          },
          {
            title: 'Value',
            key: 'value',
            render: ({ value }: IColRender) => (value.toFixed(2)),
          },
          {
            key: 'id',
            width: '20px',
            render: ({ value, item }: IColRender) => (
              <RemoveBtnBox>
                <Button type="link" onClick={this.handleRemove(value)} disabled={item.isRemoving}>
                  {item.isRemoving && <LoaderIcon width="14" />}
                  {!item.isRemoving && <CrossIcon width="14" />}
                </Button>
              </RemoveBtnBox>
            ),
          },
        ]}
        isLoading={isDataLoading}
        data={data}
        pageSize={5}
      />
    )
  }
}

export default DealsTable;
