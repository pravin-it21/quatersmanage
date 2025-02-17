import React,{Component} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {HousekeepingCard} from './Cards.js'
import './show.css';


class Housekeeping extends Component {
  
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
    this.state = {
      servants: [],
      role: user.user.role,
      id: user.user.userid,
      requestPerson: '',
    };
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost:8082/dashboard/housekeeping',
      data: {
        role: this.state.role,
        id: this.state.id,
      },
    })
      .then((res) => {
        this.setState({ servants: res.data });
      })
      .catch((err) => {
        console.log('Error from Housekeeping.js:', err);
      });
  
    // Retrieve request person information if the user is housekeeping
    if (this.state.role === 'housekeeping') {
      axios({
        method: 'post',
        url: 'http://localhost:8082/housekeeping/request/getRequest',
        data: { id: this.state.id },
      })
        .then((res) => {
          if (res.data.status === 'success') {
            this.setState({ requestPerson: res.data.request });
          }
          else {
            console.log("Failed to fetch");
          }
        })
        .catch((err) => {
          console.log('Error fetching request person:', err);
        });
    }
  }

  handleCancelRequest = () => {
    axios.post('http://localhost:8082/housekeeping/request/cancel', { servantId: this.state.id })
      .then((res) => {
        if (res.data.status === 'success') {
          this.setState({ requestPerson: 'no' }); // Update the state to reflect the cancellation
          alert('Request successfully cancelled');
        } else {
          alert('Failed to cancel request');
        }
      })
      .catch((err) => {
        console.log('Error cancelling request:', err);
      });
  }
  

  render() {
    const servants = this.state.servants;
    const role = this.state.role;
    const id = this.state.id;
    const requestPerson = this.state.requestPerson;
    let servList;

    if (servants.length === 0) {
      return (
        <div className="textz">
          <h1>Sorry, all staffs are occupied!</h1>
        </div>
      );
    } else {
      servList = servants.map((serv, k) => (
        <HousekeepingCard servants={serv} role={role} key={k} id={id} />
      ));
    }

    return (
      <div className="label label-danger" style={{ margin: 'auto', marginTop: '100px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center">Availability Ledger</h2>
            </div>
          </div>
          <div className="list" style={{ margin: 'auto' }}>
            {servList}
          </div>

          {role === 'housekeeping' && requestPerson !== "no" && (
            <div className="request-container">
              <p className="cross-mark" onClick={this.handleCancelRequest}>✖</p>
              <h2 className="request-title">Request</h2>
              <p className="request-person">{requestPerson}</p>
            </div>

          )}
        </div>
      </div>
    );
  }
}

class RequestHousekeeping extends Component{
  constructor(props){
    super(props);

  this.state={
    data:{

      sid:this.props.match.params.sid,
      uid:this.props.id

    }
  }

  }
  submitHandler(event){

  event.preventDefault();


    axios({
      method: 'post',
      url: 'housekeeping/request/confirm',
      baseURL: 'http://localhost:8082/',
      data:{
        servant:this.state.data
      }

    })
    alert('Successfully requested');
    this.render();
    console.log("submitted");
  }

  render(){
    const backbtn = ()=>{
      window.location.replace('/dashboard/housekeeping')
    }
    return(
      <div >
      <center><h2>The Housekeeping staff will be at your doorsteps soon...</h2></center>
      <br/>
      <Button style={{ float:'left', fontSize:'18px',marginLeft : '10%'}} variant="warning" onClick={backbtn}><b>&larr; Back</b></Button>
      <br/><br/><br/>
      <center><Button onClick={this.submitHandler.bind(this)} variant="primary">Confirm Request</Button><br/>
      <img alt='image1'src="https://media.istockphoto.com/vectors/cleaning-service-staff-smiling-cartoon-characters-isolated-on-white-vector-id958689426?k=6&m=958689426&s=612x612&w=0&h=KW24AVt3IX-yDa3LflcocU82Hn814BMU5W3AcbUV8us=" height='500px' width='500px'/>
      <br/><br/></center>
      </div>
    )
  }
}

export { Housekeeping,RequestHousekeeping};