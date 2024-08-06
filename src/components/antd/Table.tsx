import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import profilePlaceholder from "../../images/profile.jpg";
import Student from "../../types/StudentsDetailsType";
import AdministratorsType from "../../types/administrators";

const AntTable = ({
    data,
    antColumns,
}: {
    antColumns: Array<string>;
    data: Student[] | AdministratorsType[];
}) => {
    type DataIndex = keyof Student | keyof AdministratorsType;
    const [searchText, setSearchText] = useState<string | null>("");
    const [searchedColumn, setSearchedColumn] = useState<string | null>("");
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): TableColumnType<Student | AdministratorsType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<Student | AdministratorsType> = [];
    //     {
    //         title: "Name",
    //         dataIndex: "name",
    //         key: "name",
    //         width: "30%",
    //         ...getColumnSearchProps("name"),
    //     },
    //     {
    //         title: "Age",
    //         dataIndex: "age",
    //         key: "age",
    //         width: "20%",
    //         ...getColumnSearchProps("age"),
    //     },
    //     {
    //         title: "Address",
    //         dataIndex: "address",
    //         key: "address",
    //         ...getColumnSearchProps("address"),
    //         sorter: (a, b) => a.address.length - b.address.length,
    //         sortDirections: ["descend", "ascend"],
    //     },
    // ];
    antColumns?.forEach((column) => {
        columns.push({
            title: column,
            dataIndex: column,
            key: column,
            width: 20,
            ...getColumnSearchProps(column as DataIndex),
            render: (text, record, rowindex) => {
                if (column === "image" && record.image) {
                    const imgSrc =
                        (record as Student).image ||
                        (record as AdministratorsType).image;
                        const finalImgSrc = imgSrc && imgSrc.trim() !== "" ? imgSrc : profilePlaceholder;
                    return (
                        <img
                            src={finalImgSrc || profilePlaceholder}
                            alt={record.name || "Image"}
                            style={{ width: "80%" }}
                            className="rounded-full"
                        />
                    );
                } else if (
                    column === "captain" &&
                    (record as Student).captain
                ) {
                    const isCaptain = (record as Student).captain;
                    return isCaptain ? "Yes" : "No";
                } else if (column === "id") {
                    return rowindex + 1;
                } else {
                    return text;
                }
            },
        });
    });
    return (
        <div className="overflow-x-auto">
            <Table columns={columns} dataSource={data} scroll={{ x: 800 }} />
        </div>
    );
};

export default AntTable;
