import React from 'react';
import { TabsContainer, TabButton } from '../../common/StyledComponents';

const Tabs = ({ selectedTab, setSelectedTab }) => (
  <TabsContainer>
    <TabButton active={selectedTab === '아침'} onClick={() => setSelectedTab('아침')}>아침</TabButton>
    <TabButton active={selectedTab === '점심'} onClick={() => setSelectedTab('점심')}>점심</TabButton>
    <TabButton active={selectedTab === '저녁'} onClick={() => setSelectedTab('저녁')}>저녁</TabButton>
    <TabButton active={selectedTab === '간식'} onClick={() => setSelectedTab('간식')}>간식</TabButton>
  </TabsContainer>
);

export default Tabs;
