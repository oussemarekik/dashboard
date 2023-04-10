import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    TagField,
    EmailField,
    BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />

                <Table.Column dataIndex="name" title="Name" />
                <Table.Column
                    dataIndex={["email"]}
                    title="Email"
                    render={(value: any) => <EmailField value={value} />}
                />
                <Table.Column
                    dataIndex={["readonly"]}
                    title="Readonly"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["administrator"]}
                    title="Administrator"
                    render={(value: any) => <BooleanField value={value} />}
                />
               
                <Table.Column
                    dataIndex={["disabled"]}
                    title="Disabled"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column dataIndex="deviceLimit" title="Device Limit" />
                <Table.Column dataIndex="userLimit" title="User Limit" />
             
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};