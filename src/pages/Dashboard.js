import React from 'react'
import Header from '../componentes/Header'
import Cards from '../componentes/Cards'
import { Modal } from 'antd';

function Dashboard() {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  return (
    <div>
      <Header/>
      <Cards showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
     />
     <Modal visible={isExpenseModalVisible}>Income</Modal>
     <Modal visible={isIncomeModalVisible}>Expense</Modal>
    </div>
  )
}

export default Dashboard;