import React, { useState } from "react";
import Header from "../componentes/Header";
import Cards from "../componentes/Cards";
import AddExpenseModal from "../componentes/Modals/addExpense";
import AddIncomeModal from "../componentes/Modals/addIncome";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import moment from "moment";

function Dashboard() {
  const transactions=[
    {
      type:"income",
      amount:1200,
      tag:"salary",
      name:"income 1",
      date:"2023-05-23",
    },
    {
      type:"expanse",
      amount:800,
      tag:"food",
      name:"expense 1",
      date: "2023-05-17",
    },
  ];
  const {user}=useAuthState(auth);
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

  const onFinish=(values,type )=>{
    const newTransaction={
      type:values.type,
      date:moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    if (!user) {
      toast.error("User not authenticated!");
      return;
    }
  
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transaction`), 
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }


  return (
    <div>
      <Header/>
      <Cards 
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
     />
     <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
    </div>
  );
}

export default Dashboard;