import React from 'react';
import { TabsContainer, TabButton } from '../../common/StyledComponents';
import '../../../index.css'; // CSS 파일 경로를 추가하세요

const Tabs = ({ selectedTab, setSelectedTab }) => (
  <TabsContainer>
    <TabButton active={selectedTab === 1} onClick={() => setSelectedTab(1)}>
      <span className="toss-emoji">🍎</span> 아침
    </TabButton>
    <TabButton active={selectedTab === 2} onClick={() => setSelectedTab(2)}>
      <span className="toss-emoji">🥗</span> 점심
    </TabButton>
    <TabButton active={selectedTab === 3} onClick={() => setSelectedTab(3)}>
      <span className="toss-emoji">🍠</span> 저녁
    </TabButton>
    <TabButton active={selectedTab === 4} onClick={() => setSelectedTab(4)}>
      <span className="toss-emoji">🥨</span> 간식
    </TabButton>
  </TabsContainer>
);

export default Tabs;
