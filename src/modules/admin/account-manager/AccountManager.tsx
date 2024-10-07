import React, { useEffect, useMemo, useState } from 'react';
import { IKanji, ILevelKanji, IQueryKanji } from '../../../types/kanji.types';
import { accountService, kanjiService } from '../../../services';
import {
  Button,
  Modal,
  notification,
  Pagination,
  Spin,
  Table,
  TableProps,
} from 'antd';
import BaseSearch from '../../../components/base/BaseSearch';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/functions/format-date';
import { IQueryUser, IUser } from '../../../types/user.types';

export default function AccountManager() {
  const [query, setQuery] = useState<Partial<IQueryUser>>({
    page: 1,
    limit: 5,
    nameLike: '',
  });
  const [accountList, setAccountList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = (user: IUser) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this account?',
      content: `Account: ${user.fullName ?? user.email}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const rs = await accountService.deleteAccount(user.id);
          notification.success({
            message: 'Success',
            description: rs.message,
          });
          handleGetAccountList();
        } catch (error) {
          notification.error({
            message: 'Error',
            description: 'Failed to delete account.',
          });
        }
      },
    });
  };

  const columns: TableProps<IUser>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span className="text-xl font-semibold">{text}</span>,
    },
    {
      title: 'User name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <span className="text-lg font-semibold">{text}</span>,
    },
    {
      title: 'Full name',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'Date of birth',
      key: 'birthDay',
      dataIndex: 'birthDay',
      render: (birthDay) => <span>{formatDate(birthDay)}</span>,
    },
    {
      title: 'Phone number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Created date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt) => <span>{formatDate(createdAt)}</span>,
    },
    {
      title: 'Delete Account',
      key: 'deleteAccount',
      render: (_, user: IUser) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(user);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const handleGetAccountList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await accountService.listAccount(queryParam);
      setAccountList(rs.data.content);
      setQuery((pre) => ({
        ...pre,
        total: rs.data.totalCount,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAccountList();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center space-y-5">
      <h1 className="font-bold text-3xl">Account Manager</h1>
      <div className="flex flex-row justify-between items-center w-full">
        <BaseSearch
          value={query.nameLike!}
          placeholder="Input search text"
          onHandleChange={(value) => {
            if (!value)
              handleGetAccountList({
                page: query.page,
                limit: query.limit,
              });
            setQuery({ ...query, nameLike: value });
          }}
          onSearch={handleGetAccountList}
        />
      </div>
      {loading ? (
        <Spin />
      ) : (
        <div className="w-full">
          <Table<IUser>
            rowKey="id"
            columns={columns}
            dataSource={accountList}
            pagination={{
              current: query.page,
              pageSize: query.limit,
              total: query.total,
              onChange: (page, limit) => {
                setQuery((pre) => ({
                  ...pre,
                  page,
                  limit,
                }));
                handleGetAccountList({
                  ...query,
                  page,
                  limit,
                });
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
