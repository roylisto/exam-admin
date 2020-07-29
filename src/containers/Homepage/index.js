import React, { Component } from 'react';
import styled from 'styled-components';
import ImgLogo from '../../components/Logo';
import logo from '../../assets/images/react.svg';

const Content = styled.div`
  padding: 5%;
`;
const Title = styled.h3`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;

class Homepage extends Component {
  render() {
    return (
      <Content>
        <Title><ImgLogo src={logo} alt="logo" /><span>React Express</span></Title>
        <p>
          Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf.
        </p>
      </Content>
    )
  }
}

export default Homepage;
