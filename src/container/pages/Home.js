import React,{ Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios';

import Start from '../components/Start'
import GameCard from '../components/GameCard/GameCard'
import Play from '../components/Play/Play'
import { home } from '../../constants';
import { authAxios } from '../../utils';


class Home extends Component {

  state = {
    guest_id: null,
    games_list: null
  }

  componentDidMount() {
    const guest_id = localStorage.getItem("mind_race_guest_id")

    if(guest_id){
      this.setState({
        guest_id: guest_id
      })
        axios.post(home, {
          guest_id: guest_id
        }).then(res => {
          this.setState({
            games_list: res.data.games_list
          })
        }).catch(err => {
          console.log(err);
        })
    } else {
      authAxios.post(home, {
        guest_id: null
      }).then(res => {
        this.setState({
          games_list: res.data.games_list
        })
      }).catch(err => {
        console.log(err);
      })
    }

  }

  render(){
    const { token } = this.props
    const { guest_id, games_list } = this.state

    return (
      <div>
        <Play />
        { !token && !guest_id ?
          <Start /> : 
          <div style={{padding:'10px'}}>
            { games_list !== null ?
              games_list.map((game,index) =>
                <GameCard key={index}
                  game_id={game[0].game_id}
                  in_progress={game[1].in_progress}
                  p1_progress={game[2]}
                  p2_progress={game[3]}
                  start_date={game[4].start_date}
                  end_date={game[5].end_date}
                  winner={game[6].winner}
                  won={game[7].won}
                />
              ): null }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
)(Home);
