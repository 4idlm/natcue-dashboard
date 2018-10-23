import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../../Store/Action'
import Piechart from '../../components/piechart/piechart'
import { Modal, DatePicker, Table } from 'antd'
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import { PropagateLoader } from 'react-spinners'
import { ToastContainer } from 'react-toastify'
import moment from 'moment'
import { CSVLink } from 'react-csv'
import './consultationReport.css'

let today = new Date();
let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1);
let style = {
    loadingStyle: null,
}
let rows;
let columns;
const { RangePicker } = DatePicker

class ConsultationReport extends Component {

    constructor(props) {
        super()
        this.state = {
            fromDate: this.parseDate(today),
            toDate: this.parseDate(yesterday),
            modalHeader: null,
            modal: false,
            patientListColumns: [
                {
                    dataIndex: 'name',
                    title: 'Username',
                }, {
                    dataIndex: 'booked',
                    title: 'Appointment',
                },
                {
                    dataIndex: 'completed',
                    title: 'Completed',
                },
                {
                    dataIndex: 'notPickup',
                    title: 'Not Picked',
                },
                {
                    dataIndex: 'cancelledDR',
                    title: 'Cancelled by Dr',
                },
                {
                    dataIndex: 'cancelledUser',
                    title: 'Cancelled by user',
                },
                {
                    dataIndex: 'notRecommended',
                    title: 'Not Recommended',
                }
            ],
            overallReportColumns: [
                {
                    title: 'Doctor',
                    dataIndex: 'doctorName',
                    render: text => <a href="javascript:;">{text}</a>,
                }, {
                    title: 'System',
                    dataIndex: 'treatment',
                },
                {
                    title: 'Patient',
                    dataIndex: 'userName',
                },
                {
                    title: 'Phone',
                    dataIndex: 'phone',
                },
                {
                    title: 'Purpose',
                    dataIndex: 'purpose',
                },
                {
                    title: 'Status',
                    dataIndex: 'displayStatus',
                },
                {
                    title: 'Appoinment',
                    dataIndex: 'appointment',
                },
                {
                    title: 'Completed',
                    dataIndex: 'completed',
                },
                {
                    title: 'Not Pickedup',
                    dataIndex: 'notPickedUp',
                },
                {
                    title: 'Cancelled by DR',
                    dataIndex: 'cancelledDR',
                },
                {
                    title: 'Cancelled by User',
                    dataIndex: 'cancelled',
                },
                {
                    title: 'Not Recommended',
                    dataIndex: 'notRecommended',
                },
            ],
            getReport: "Get Report",
            cursor: "pointer",
            btnDisabled: false,
        }
    }

    async componentDidMount() {
        await this.props.fetchDoctors();
        if (this.props.doctorList.length >= 1) {
            let doctorname = this.props.doctorList[0].name;
            await this.props.fetchReport(doctorname, this.state.fromDate, this.state.toDate);
        }
        await this.props.overallConsultation(this.state.fromDate, this.state.toDate)
    }

    componentWillReceiveProps(props) {
        if (props.overallReport.length >= 1) {
            this.setState({
                getReport: "✓ Done",
                cursor: "not-allowed",
                btnDisabled: true
            })
        }
    }

    onDateChange = (date, dateString) => {
        this.setState({
            getReport: "Get Report",
            cursor: "pointer",
            btnDisabled: false,
            fromDate: dateString[0],
            toDate: dateString[1]
        })
    }

    parseDate = (date) => {
        return moment(date).format('YYYY-MM-DD')
    }

    getOverallStatus = async () => {
        this.props.changeStatus(); // changes loader status <Boolean> 
        this.props.overallConsultation(this.state.fromDate, this.state.toDate)
    }

    getReportHandler = (doctorname) => {
        this.props.fetchReport(doctorname, this.state.fromDate, this.state.toDate)
    }

    onOpenModel = async (doctorname, e) => {
        if (doctorname === "Over All Report") {
            await this.setState({
                modal: true,
                modalHeader: doctorname,
            })

        }
        if (doctorname !== "Over All Report") {
            e.stopPropagation()
            await this.setState({ modal: true, modalHeader: doctorname });
            await this.props.fetchPatientList(doctorname, this.state.fromDate, this.state.toDate)
        }
    }

    onCloseModal = () => {
        this.setState({
            modal: false,
            modalHeader: null
        });
    }

    handleCancel = (e) => {
        this.setState({
            modal: false,
        });
    }

    render() {
        // Excel headers
        let headers = [
            { label: 'Doctor Name', key: 'doctorName' },
            { label: 'Medical System', key: 'treatment' },
            { label: 'Patient name', key: 'userName' },
            { label: 'Phone', key: 'phone' },
            { label: 'Purpose', key: 'purpose' },
            { label: 'Status', key: 'displayStatus' },
            { label: 'Appoinment', key: 'appointment' },
            { label: 'Completed', key: 'completed' },
            { label: 'Not Pickup', key: 'notPickedUp' },
            { label: 'Cancelled by DR', key: 'cancelledDR' },
            { label: 'Cancelled by User', key: 'cancelled' },
            { label: 'Not Recommended', key: 'notRecommended'}
        ];

        // List of Doctors
        let doctorList = this.props.doctorList.map(d => {
            return (
                <ul key={d._id} className="list-group pb-2">
                    <li className="list-group-item btn text-left font-style"
                        onClick={() => this.getReportHandler(d.name)}>
                        {d.name}
                        <span className="pull-right" >
                            <span className="btn btn-xs p-0 btn-default"
                                onClick={(e) => this.onOpenModel(d.name, e)}>
                                <a href="#" aria-hidden="true">Details</a>
                            </span>
                        </span >
                    </li >
                </ul>
            )
        })

        // Chart 
        let reportData = {
            Pending: 0,
            Completed: 0,
            ReportAttached: 0,
            ConsultationDidNotPick: 0,
            ConsultationCancelDR: 0,
            ConsultationCancel: 0
        }
        let chart;
        if (this.props.consultationReportStatus === true) {
            this.props.consultationReport.forEach(data => {
                if (data.status === "0") reportData.Pending += 1
                if (data.status === "1") reportData.Completed += 1
                if (data.isattachreport === true) reportData.ReportAttached += 1
                if (data.isattachreport === null) reportData.ReportAttached = 0
                if (data.displayStatus === "CONSULTATION_DID_NOT_PICK") reportData.ConsultationDidNotPick += 1
                if (data.displayStatus === "CONSULTATION_CANCEL_DR") reportData.ConsultationCancelDR += 1
                if (data.displayStatus === "CONSULTATION_CANCEL") reportData.ConsultationCancel += 1
            })
            let data = Object.values(reportData);
            let labels = [
                'Pending',
                'Completed',
                'Report Atached',
                'Not Pickedup',
                'Cancelled by doctor',
                'Cancelled by user'
            ]
            chart = <Piechart data={data} labels={labels} />
        } else if (this.props.consultationReportStatus === false) {
            let msg = this.props.consultationReport
            //toast.error(msg) 
            chart =
                < div >
                    <p>{msg}</p>
                    <img
                        style={{ width: "100%" }}
                        src="assets/404shutterstock.png"
                        alt={this.props.consultationReport} />
                </div >
        }

        // Loader styles
        if (this.props.loading) {
            style.loadingStyle = {
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
            style.loadingStyle = null
        }

        // Datatables
        if (this.state.modalHeader === "Over All Report") {
            rows = this.props.overallReport;
            columns = this.state.overallReportColumns
        } else {
            rows = this.props.patientList;
            columns = this.state.patientListColumns
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
            <div className="content-wrapper" >
                <div style={style.loadingStyle}>
                    <PropagateLoader color={"#FFCE56"} loading={this.props.loading} />
                </div>
                <ToastContainer
                    position="bottom-right"
                    draggable={true}
                    closeOnClick={true} />
                <Modal 
                    title={(<h5>{this.state.modalHeader}</h5>)}
                    visible={this.state.modal}
                    onCancel={this.onCloseModal}
                    footer={null}
                    wrapClassName={"consultationModal"}
                    width={"95%"}
                    zIndex={9999999}
                >
                    <Table
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={rows}
                        bordered />
                </Modal>
                <div className="container-fluid">
                    <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Consultation" />
                    <div className="main-body">
                        <div className="rows">
                            <div className="col-lg-12 d-flex justify-content-around align-items-center mt-5 mb-5">
                                <div className="col-md-6 font-style d-flex">
                                    <RangePicker
                                        defaultValue={[moment(this.state.fromDate, 'YYYY-MM-DD'), moment(this.state.toDate, 'YYYY-MM-DD')]}
                                        onChange={this.onDateChange}
                                        size="large"
                                        format={'YYYY-MM-DD'}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <button
                                        disabled={this.state.btnDisabled}
                                        style={{ cursor: this.state.cursor }}
                                        className="button-style"
                                        onClick={this.getOverallStatus}>
                                        {this.state.getReport}
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <div className="row">
                                                <h5 className="col-lg-6"><i className="fa fa-stethoscope custom"></i>  Doctor List</h5>
                                                <a className="col-lg-3" onClick={() => this.onOpenModel("Over All Report")}>View</a>
                                                <CSVLink className="col-lg-3"
                                                    data={this.props.overallReport}
                                                    headers={headers}
                                                    filename={`${moment().format('YYYYMMDDhhmmss')}.csv`}
                                                >
                                                    Export
                                                </CSVLink >
                                            </div>
                                        </div>
                                        <div className="card-body doctorlist">
                                            {doctorList}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h5><i className="fa fa-pie-chart"></i>  {this.props.doctorname}</h5>
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
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        doctorList: state.report.doctorList,
        consultationReport: state.report.consultationReport,
        patientList: state.report.patientList,
        overallReport: state.report.overallReport,
        consultationReportStatus: state.report.consultationReportStatus,
        patientListStatus: state.report.patientListStatus,
        overAllReportStatus: state.report.overAllReportStatus,
        loading: state.report.loading,
        doctorname: state.report.doctorname,
        consultdate: state.report.consultdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctors: () => dispatch(action.doctors()),
        fetchReport: (doctorname, fromDate, toDate) => dispatch(action.report(doctorname, fromDate, toDate)),
        fetchPatientList: (doctorname, fromDate, toDate) => dispatch(action.patientList(doctorname, fromDate, toDate)),
        overallConsultation: (fromDate, toDate) => dispatch(action.overallConsultation(fromDate, toDate)),
        changeStatus: () => dispatch(action.getOverallReport())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationReport)
