import React, { useState } from 'react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟社区帖子数据
  const posts = [
    {
      id: 1,
      author: '铲屎官小A',
      time: '2小时前',
      content: '我家猫咪最近总是发出低沉的喵喵声，翻译器说它很满足，但它最近吃得比平时少，这正常吗？',
      likes: 15,
      comments: 8,
      type: '求助'
    },
    {
      id: 2,
      author: '猫咪爱好者',
      time: '5小时前',
      content: '今天用翻译器听到我家猫咪说"快来和我一起玩！"，于是陪它玩了半小时逗猫棒，它现在开心地睡着了～',
      likes: 23,
      comments: 12,
      type: '分享'
    },
    {
      id: 3,
      author: '新手养猫',
      time: '1天前',
      content: '第一次养猫，请问猫咪的拉长音喵喵声通常是什么意思？翻译器说是饥饿，但我刚喂过它不久...',
      likes: 9,
      comments: 5,
      type: '求助'
    },
    {
      id: 4,
      author: '猫奴一枚',
      time: '2天前',
      content: '分享一个小技巧：当猫咪发出快速连续的喵喵声时，用激光笔陪它玩5分钟，它就会变得超级温顺！',
      likes: 31,
      comments: 17,
      type: '分享'
    }
  ];

  // 过滤帖子
  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'all' || post.type === activeTab;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleLike = (postId) => {
    // 这里将在后续实现点赞功能
    console.log(`点赞帖子 ${postId}`);
  };

  const handleComment = (postId) => {
    // 这里将在后续实现评论功能
    console.log(`评论帖子 ${postId}`);
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>💬 萌宠交流社区</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索帖子或用户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="community-nav">
        <button 
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          全部
        </button>
        <button 
          className={activeTab === '求助' ? 'active' : ''}
          onClick={() => setActiveTab('求助')}
        >
          求助
        </button>
        <button 
          className={activeTab === '分享' ? 'active' : ''}
          onClick={() => setActiveTab('分享')}
        >
          分享
        </button>
      </div>

      <div className="posts-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-author">{post.author}</span>
              <span className="post-time">{post.time}</span>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                ❤️ {post.likes}
              </button>
              <button onClick={() => handleComment(post.id)}>
                💬 {post.comments}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;