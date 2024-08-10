import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import profilePlaceholder from "../../images/profile.jpg";
import Student from "../../types/StudentsDetailsType";
import AdministratorsType from "../../types/administrators";
import { useSelector } from "react-redux";
import { selectStudentStatus } from "../../pages/admin/components/redux/ReduxSlice";

interface AntTableColumn {
    name: string;
    search: boolean;
}
const AntTable = ({
    data,
    antColumns,
}: {
    antColumns: AntTableColumn[];
    data: Student[] | AdministratorsType[];
}) => {
    type DataIndex = keyof Student | keyof AdministratorsType;
    const [searchText, setSearchText] = useState<string | null>("");
    const [searchedColumn, setSearchedColumn] = useState<string | null>("");
    const searchInput = useRef<InputRef>(null);
    const [status, setStatus] = useState<boolean>(false);
    const statusRedux = useSelector(selectStudentStatus);

useEffect(()=>{
    if (statusRedux === "loading") {
        setStatus(true);
    } else setStatus(false);
},[statusRedux])

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
            title: column.name,
            dataIndex: column.name,
            key: column.name,
            width: 20,
            ...(column.search
                ? getColumnSearchProps(column.name as DataIndex)
                : null),
            render: (text, record, rowindex) => {
                if (column.name === "image") {
                    const imgSrc =
                        (record as Student).image ||
                        (record as AdministratorsType).image;
                    const finalsrc = imgSrc?.toString() || profilePlaceholder;

                    return (
                        <img
                            src={finalsrc}
                            alt={record.name || "Image"}
                            style={{ width: "100%" }}
                            className="rounded-full aspect-square object-cover"
                        />
                    );
                } else if (
                    column.name === "captain" &&
                    (record as Student).captain
                ) {
                    const isCaptain = (record as Student).captain;
                    return isCaptain ? "Yes" : "No";
                } else if (column.name === "id") {
                    return rowindex + 1;
                } else if (
                    (record as AdministratorsType).joiningDate &&
                    column.name === "joiningDate"
                ) {
                    const joiningDate = (record as AdministratorsType)
                        .joiningDate;
                    if (joiningDate) {
                        const date = new Date(joiningDate);
                        const formattedDate = date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });
                        return formattedDate;
                    }
                    return "N/A";
                } else {
                    return text;
                }
            },
        });
    });
    return (
        <div className="overflow-x-auto">
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 800 }}
                className="text-center"
                loading={status}
            />
        </div>
    );
};

export default AntTable;
