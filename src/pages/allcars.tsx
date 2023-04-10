import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CarList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column
                    dataIndex={["ignition"]}
                    title="Ignition"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column dataIndex="speed" title="Speed" />
                <Table.Column dataIndex="course" title="Course" />
                <Table.Column dataIndex="status" title="Status" />
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