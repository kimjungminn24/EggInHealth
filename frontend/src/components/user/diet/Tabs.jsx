import React from 'react';
import { TabsContainer, TabButton } from '../../common/StyledComponents';

const Tabs = ({ selectedTab, setSelectedTab }) => (
  <TabsContainer>
    <TabButton active={selectedTab === 1} onClick={() => setSelectedTab(1)}>🍎아침</TabButton>
    <TabButton active={selectedTab === 2} onClick={() => setSelectedTab(2)}>🥗점심</TabButton>
    <TabButton active={selectedTab === 3} onClick={() => setSelectedTab(3)}>🍠저녁</TabButton>
    <TabButton active={selectedTab === 4} onClick={() => setSelectedTab(4)}>🥨간식</TabButton>
  </TabsContainer>
);

export default Tabs;
