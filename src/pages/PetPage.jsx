import React, { useState } from 'react';

const PetPage = () => {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: '小花',
      age: 2,
      breed: '英短',
      gender: '雌性',
      color: '三花'
    },
    {
      id: 2,
      name: '小黑',
      age: 1,
      breed: '美短',
      gender: '雄性',
      color: '黑色'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    gender: '',
    color: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.breed || !formData.gender || !formData.color) {
      alert('请填写完整的萌宠信息！');
      return;
    }

    const newPet = {
      id: Date.now(),
      ...formData
    };

    setPets(prev => [...prev, newPet]);
    
    // 重置表单
    setFormData({
      name: '',
      age: '',
      breed: '',
      gender: '',
      color: ''
    });

    alert('萌宠信息添加成功！');
  };

  const handleDelete = (petId) => {
    if (window.confirm('确定要删除这个萌宠吗？')) {
      setPets(prev => prev.filter(pet => pet.id !== petId));
    }
  };

  return (
    <div className="pet-page">
      <div className="pet-header">
        <h1>🏠 我的萌宠</h1>
      </div>

      {/* 萌宠信息表单 */}
      <div className="pet-form">
        <h2>添加新萌宠</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>姓名</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="请输入萌宠姓名"
            />
          </div>

          <div className="form-group">
            <label>年龄（岁）</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="请输入萌宠年龄"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>品种</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              placeholder="请输入萌宠品种"
            />
          </div>

          <div className="form-group">
            <label>性别</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              placeholder="请输入萌宠性别"
            />
          </div>

          <div className="form-group">
            <label>毛色</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="请输入萌宠毛色"
            />
          </div>

          <button type="submit" className="submit-btn">添加萌宠</button>
        </form>
      </div>

      {/* 萌宠列表 */}
      <div className="pets-list">
        <h2>萌宠列表</h2>
        {pets.length === 0 ? (
          <p className="no-pets">还没有添加萌宠，快来添加吧！</p>
        ) : (
          pets.map(pet => (
            <div key={pet.id} className="pet-card">
              <div className="pet-info">
                <h3>🐱 {pet.name}</h3>
                <div className="pet-details">
                  <p><strong>年龄：</strong>{pet.age}岁</p>
                  <p><strong>品种：</strong>{pet.breed}</p>
                  <p><strong>性别：</strong>{pet.gender}</p>
                  <p><strong>毛色：</strong>{pet.color}</p>
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(pet.id)}
                style={{
                  backgroundColor: '#ff69b4',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                删除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetPage;