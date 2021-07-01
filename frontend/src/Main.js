import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import axios from 'axios'

class Main extends Component {
    state = {
        //하단 값들을 초기화
        selectedFile: null,
        imagePreviewUrl: null,
        answer: null,
        predFst: null,
        predScd: null,
        predThd: null,
        perFst: null,
        perScd: null,
        perThd: null,
        renderState: 0
    };

    //사진을 올릴때 사용하는 함수
    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])

    }

    //사진을 서버에 업로드할때 사용하는 함수
    submit = () => {
        var fd = new FormData();

        fd.append('file', this.state.selectedFile);
        axios.post('http://localhost:5000/', fd)
            .then(res => {
                console.log(res.data);
                this.setState({
                    answer: res.data["answer"],
                    predFst: res.data["predFst"],
                    predScd: res.data["predScd"],
                    predThd: res.data["predThd"],
                    perFst: res.data["perFst"],
                    perScd: res.data["perScd"],
                    perThd: res.data["perThd"],
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        //이미지 미리보기를 설정하는 부분
        let $imagePreview = (<div className="previewText image-container" ></div>);
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
        }
        if (this.state.renderState == 0) {
            if (this.props.location.state !== undefined) {
                this.setState({
                    predFst: this.props.location.state.predFst,
                    predScd: this.props.location.state.predScd,
                    predThd: this.props.location.state.predThd,
                    perFst: this.props.location.state.perFst,
                    perScd: this.props.location.state.perScd,
                    perThd: this.props.location.state.perThd,
                })
            }
            this.state.renderState = 1;
        }

        return (
            //여기서부터 html같은 부분
            <div className='page'>
                <div className='container'>
                    {/* 제목부분 */}
                    <div>
                        <img src="images/나누구개로고.png" alt="강아지 배경사진" />
                    </div>

                    {/* 왼쪽 설명 부분 */}
                    <div className="smallcontainer">
                        <p className="explain1">등록된 견종</p>
                        <p className="explain2">120종</p>
                        <Link className="goSubpage" to={{
                            pathname: "/First",
                            state: {
                                view: 'Fst',
                                predFst: this.state.predFst,
                                predScd: this.state.predScd,
                                predThd: this.state.predThd,
                                perFst: this.state.perFst,
                                perScd: this.state.perScd,
                                perThd: this.state.perThd,
                            }
                        }}>
                            <p className="explain3"> {this.state.predFst}{this.state.perFst} </p>
                        </Link>
                        <h1></h1>
                        {/* 제일 확률이 높은 견종 변수 기입 */}
                        <Link className="goSubpage" to={{
                            pathname: "/First",
                            state: {
                                view: 'Scd',
                                predFst: this.state.predFst,
                                predScd: this.state.predScd,
                                predThd: this.state.predThd,
                                perFst: this.state.perFst,
                                perScd: this.state.perScd,
                                perThd: this.state.perThd,
                            }
                        }}>
                            <p className="explain3"> {this.state.predScd} {this.state.perScd} </p>
                        </Link>
                        <h1></h1>
                        {/* 제일 확률이 높은 견종 변수 기입 */}
                        <Link className="goSubpage" to={{
                            pathname: "/First",
                            state: {
                                view: 'Thd',
                                predFst: this.state.predFst,
                                predScd: this.state.predScd,
                                predThd: this.state.predThd,
                                perFst: this.state.perFst,
                                perScd: this.state.perScd,
                                perThd: this.state.perThd,
                            }
                        }}>
                            <p className="explain3"> {this.state.predThd} {this.state.perThd} </p>
                        </Link>
                    </div>
                    {/* 오른쪽 파일 업로드, 이미지 전달 및 secondpage 링크 부분 */}
                    <div className="smallcontainer2">
                        <div className="img-holder">
                            <input type="file" name="avatar" onChange={this.fileChangedHandler} />
                            {/* 이미지 미리보기 부분을 여기서 호출 */}
                            {$imagePreview}
                        </div>

                        <div className="wrap">
                            <button className="button1" type="button" onClick={this.submit} >
                                찾아보기
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Main;