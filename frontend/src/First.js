import React, { Component } from 'react';
import './App.css';
import Chart from 'react-google-charts';
import { Link } from "react-router-dom";
import axios from 'axios';



//let posts = { color: 'black', fontSize: '20px' };

class First extends Component {
    //기본적으로 글자에 중첩되는 css를 여기서 써봤습니다. 나머지는 App.css에서 작업했습니다 
    posts = { color: 'black', fontSize: '20px' }

    //받아올 변수들을 usestate를 사용하여 객체형으로 할당시켰습니다.
    state = {
        //하단 값들을 초기화
        predFst : null,
        predScd : null,
        predThd : null,
        perFst : null,
        perScd : null,
        perThd : null,

        Dog_breed: '',
        hashtag1: '',
        hashtag2: '',
        hashtag3: '',
        Diagram1: '',
        Diagram2: '',
        Diagram3: '',
        Diagram4: '',
        Diagram5: '',
        feature: '',
        warning: '',
        Vital_Status1: '',
        Vital_Status2: '',
        Vital_Status3: '',
        Vital_Status4: '',
        posts : { color: 'black', fontSize: '20px' },
        renderState : 0
    };

    submit =() => {
        var index = new FormData();
        if(this.props.location.state.view == "Fst"){
            index.append('index', this.props.location.state.predFst);
        }
        else if(this.props.location.state.view == "Scd"){
            index.append('index', this.props.location.state.predScd);
        }
        else if(this.props.location.state.view == "Thd"){
            index.append('index', this.props.location.state.predThd);
        }
        //값을 받아오는 부분입니다. 해당 서버로부터 값을 받아서 앞에서 지정한 setDogInfo함수에 지정했던 변수로 넣어줍니다.
        axios.post('http://localhost:5000/getDB', index)
            .then(res =>{
                this.setState({
                    Dog_breed: res.data["kr_name_"],
                    hashtag1 : res.data["hashtag1_"],
                    hashtag2 : res.data["hashtag2_"],
                    hashtag3 : res.data["hashtag3_"],
                    Diagram1 : Number(res.data["adapt_"]),
                    Diagram2 : Number(res.data["health_"]),
                    Diagram3 : Number(res.data["physic_"]),
                    Diagram4 : Number(res.data["train_"]),
                    Diagram5 : Number(res.data["kind_"]),
                    feature : res.data["feature_"],
                    warning : res.data["warning_"],
                    Vital_Status1 : res.data["group_"],
                    Vital_Status2 : res.data["height_"],
                    Vital_Status3 : res.data["weight_"],
                    Vital_Status4 : res.data["lifespan_"]
                })
            })
            .catch(error=>{
                console.log(error);
            });
    }

    render =() => {
        if (this.state.renderState == 0){
            if(this.props.location.state !== undefined){
                this.setState({
                    predFst : this.props.location.state.predFst,
                    predScd : this.props.location.state.predScd,
                    predThd : this.props.location.state.predThd,
                    perFst : this.props.location.state.perFst,
                    perScd : this.props.location.state.perScd,
                    perThd : this.props.location.state.perThd,
                })
            }
            this.submit();
            this.state.renderState = 1;
        }

    return (
        <div className="App">
            <div className="title">
                {/* 강아지 대문 사진 */}
                <Link className="goSubpage" to={{
                            pathname: "/",
                            state : {
                                predFst : this.state.predFst,
                                predScd : this.state.predScd,
                                predThd : this.state.predThd,
                                perFst : this.state.perFst,
                                perScd : this.state.perScd,
                                perThd : this.state.perThd,
                            }
                        }}>                        
                    <div className="pre.img">
                        <img src="images/species/pre.jpg" alt="강아지 배경사진" />
                    </div>
                </Link>
                {/* 강아지 이름 */}
                <div>
                    <span style={{ fontSize: '40px', color: 'black' }}>{this.state.Dog_breed}</span>{' '}
                </div>
                {/* 해시테그가 여기서 들어갑니다 */}
                <div className="Hashtag">
                    <p>{this.state.hashtag1}{this.state.hashtag2}{this.state.hashtag3}</p>
                </div>
            </div>

            <div className="body">
                <div className="dia">
                    <h3 style={this.state.posts}> 항목별 강아지 역량 </h3>
                    <p>
                        {' '}
                        해당 지표에 대한 견종별 데이터를 분석해 막대그래프로 제공해드립니다!{' '}
                    </p>
                    {/* 차트 부분입니다 google chart를 이용했어요 */}
                    <div className="chart">
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['항목', '역량'],
                                ['적응성', this.state.Diagram1],
                                ['건강 관리도', this.state.Diagram2],
                                ['운동성', this.state.Diagram3],
                                ['훈련 가능성', this.state.Diagram4],
                                ['친근함', this.state.Diagram5],
                            ]}
                            options={{
                                chartArea: { width: '50%' },
                                hAxis: {
                                    title: '항목별 강아지 역량',
                                    minValue: 0,
                                    maxValue: 5,
                                },
                                vAxis: {
                                    title: '항목',
                                },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                </div>

                {/* 특징 부분 */}
                <div className="feature">
                    <h3 style={this.state.posts}> 강아지 특징 </h3>
                    <p> {this.state.feature} </p>
                    <hr />
                </div>

                {/* 주의사항 부분 */}
                <div className="caution">
                    <h3 style={this.state.posts}> 강아지 주의사항 </h3>
                    <p> {this.state.warning} </p>
                </div>
                <hr />
            </div>

            {/* Vital부분 */}
            <div className="vital">
                <h3 style={this.state.posts}> Vital Status </h3>
                <div className="dog">
                    <img src="/images/vital/dog.png" alt="견종 분류" /> <p style={this.state.posts}>견종 분류</p>
                    <p>{this.state.Vital_Status1}</p>
                </div>

                <div className="height">
                    <img src="/images/vital/height.png" alt="신장" /> <p style={this.state.posts}>신장</p>
                    <p>{this.state.Vital_Status2}</p>
                </div>

                <div className="weight">
                    <img src="/images/vital/weight.png" alt="무게" /> <p style={this.state.posts}>무게</p>
                    <p>{this.state.Vital_Status3}</p>
                </div>

                <div className="life">
                    <img src="/images/vital/life.png" alt="기대 수명" /> <p style={this.state.posts}>기대 수명</p>
                    <p>{this.state.Vital_Status4}</p>
                </div>
            </div>
            <hr />
        </div>
    );
    }
}
export default First;