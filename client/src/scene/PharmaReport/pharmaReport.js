import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, DatePicker, Table } from 'antd'
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import Piechart from '../../components/piechart/piechart'
import { PropagateLoader } from 'react-spinners'
import moment from 'moment'
import * as action from '../../Store/Action'
import './pharmaReport.css'

let today = new Date();
let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1);

const { RangePicker } = DatePicker

class PharmaReport extends Component {

    constructor(props) {
        super()
        this.state = {
            fromDate: this.parseDate(today),
            toDate: this.parseDate(yesterday),
            modal: false,
            pharmacyName: null
        }

    }

    async componentDidMount() {
        await this.props.fetchPharmaList();
        await this.setState({
            pharmacyName: this.props.pharmacyList[0].pharmaName
        })
        if (this.props.pharmacyReport.length === 0 && this.props.pharmacyList.length != 0) {
            let pharmaId = this.props.pharmacyList[0].pharmaId
            await this.props.fetchpharmaReport(pharmaId, this.state.fromDate, this.state.toDate)
        }
    }

    onDateChange = (date, dateString) => {
        this.setState({
            fromDate: dateString[0],
            toDate: dateString[1]
        })

    }

    getReportHandler = (pharmaId, pharmaName) => {
        this.setState({
            pharmacyName: pharmaName
        })
        this.props.fetchpharmaReport(pharmaId, this.state.fromDate, this.state.toDate)
    }

    parseDate = (date) => {
        return moment(date).format('YYYY-MM-DD')
    }

    onOpenModal = (pharmaId, pharmacyName) => {
        this.setState({
            modal: true,
            pharmacyName
        })
        this.props.fetchpharmaReport(pharmaId, this.state.fromDate, this.state.toDate)
    }

    handleCancel = (e) => {
        this.setState({
            modal: false,
        });
    }

    render() {
        let pharmacyList = this.props.pharmacyList.map(p => (
            <ul key={p.pharmaId} className="list-group pb-2">
                <li className="list-group-item btn text-left font-style"
                    onClick={() => this.getReportHandler(p.pharmaId, p.pharmaName)}>
                    {p.pharmaName}
                    <span className="pull-right" >
                        <span className="btn btn-xs p-0 btn-default"
                            onClick={(e) => this.onOpenModal(p.pharmaId, p.pharmaName, e)}>
                            <a href="#" aria-hidden="true">Details</a>
                        </span>
                    </span >
                </li >
            </ul>
        ))

        // Chart
        let reportData = {
            total: this.props.pharmacyReport.length,
            pending: 0,
            quotSent: 0,
            ordered: 0,
            processed: 0,
            shipped: 0,
            closed: 0
        }

        let chart;
        if (this.props.pharmacyReportStatus === true) {
            this.props.pharmacyReport.map(data => {
                if (data.displayStatus === "CONSULTATION_COMPLETED" && data.ismedquotsent === false) reportData.pending += 1;
                if (data.displayStatus === "SENT_QUOTATION" && data.ismedquotsent === true) reportData.quotSent += 1;
                if (data.displayStatus === "PLACED_ORDER" && data.ismedordered === true) reportData.ordered += 1;
                if (data.displayStatus === "PROCESSED_MED") reportData.processed += 1;
                if (data.displayStatus === "SHIPPED_MED") reportData.shipped += 1;
                if (data.displayStatus === "ORD_CLOSED") reportData.closed += 1;
            })
            let data = Object.values(reportData);
            let labels = [
                "Total",
                "Pending",
                "Quot-sent",
                "Ordered",
                "Processed",
                "Shipped",
                "Closed"
            ]

            chart = <Piechart data={data} labels={labels} />
        } else if (this.props.pharmacyReportStatus === false) {
            //let msg = this.props.report
            //toast.error(msg) 
            chart =
                < div >
                    <p>{this.props.pharmacyReport}</p>
                    <img
                        style={{ width: "100%" }}
                        src="assets/404shutterstock.png"
                        alt={this.props.pharmacyReport} />
                </div >
        }


        // Tables
        let rows = [];

        const columns = [{
            dataIndex: 'name',
            title: 'Name'
        }, {
            dataIndex: 'phone',
            title: 'Phone'
        }, {
            dataIndex: 'status',
            title: 'Status'
        }];

        if (this.props.pharmacyReportStatus === true) {
            this.props.pharmacyReport.map(data => {
                let status;
                if (data.displayStatus === "CONSULTATION_COMPLETED" && data.ismedquotsent === false) status = "Pending";
                if (data.displayStatus === "SENT_QUOTATION" && data.ismedquotsent === true) status = "Quotation sent";
                if (data.displayStatus === "PLACED_ORDER" && data.ismedordered === true) status = "Ordered";
                if (data.displayStatus === "PROCESSED_MED") status = "Processing";
                if (data.displayStatus === "SHIPPED_MED") status = "Shipped";
                // if (data.displayStatus === "ORD_CLOSED") status = "Closed";
                rows.push({
                    name: data.contactperson.name,
                    phone: data.contactperson.phone,
                    status
                })
            })
        } else if (this.props.pharmacyReportStatus === false) {
            // console.log(this.props.pharmacyReport)
        }


        let style;
        if (this.props.loading) {
            style = {
                background: "rgba(0, 0, 0, 0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                overflowY: "auto",
                overflowX: "hidden",
                zIndex: "1000",
                padding: "1.2rem",
            }
        } else {
            style = null
        }

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div className="content-wrapper">
                <div style={style}>
                    <PropagateLoader color={"#FFCE56"} loading={this.props.loading} />
                </div>
                <div className="container-fluid">
                    <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Pharmacy" />
                    <div className="main-body">
                        <Modal className="pharmaModal"
                            title={(<h3>{this.state.pharmacyName}</h3>)}
                            visible={this.state.modal}
                            onCancel={this.handleCancel}
                            footer={null}
                            width={"50%"}
                            zIndex={999999}
                        >
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={rows}
                                bordered />
                        </Modal>
                        <div className="rows">
                            <div className="col-lg-12  mt-5 mb-5">
                                <RangePicker
                                    defaultValue={[moment(this.state.fromDate, 'YYYY-MM-DD'), moment(this.state.toDate, 'YYYY-MM-DD')]}
                                    onChange={this.onDateChange}
                                    size="large"
                                    format={'YYYY-MM-DD'}
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h5><i className="fa fa-medkit custom"></i> Pharmacy List</h5>
                                        </div>
                                        <div className="card-body doctorlist">
                                            {pharmacyList}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h5><i className="fa fa-pie-chart"></i>  {this.state.pharmacyName}</h5>
                                        </div>
                                        <div className="card-body">
                                            {chart}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pharmacyList: state.report.pharmacyList,
        pharmacyReport: state.report.pharmacyReport,
        pharmaId: state.report.pharmacyid,
        loading: state.report.loading,
        pharmacyReportStatus: state.report.pharmacyReportStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPharmaList: () => dispatch(action.pharmaList()),
        fetchpharmaReport: (pharmaId, fromDate, toDate) => dispatch(action.pharmaReport(pharmaId, fromDate, toDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PharmaReport)
