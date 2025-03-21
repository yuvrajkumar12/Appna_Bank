import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import Cards from "../componentes/Cards";
import AddExpenseModal from "../componentes/Modals/addExpense";
import AddIncomeModal from "../componentes/Modals/addIncome";
import { addDoc, collection,getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import moment from "moment";
import TransactionsTable from "../componentes/TransactionsTable";

function Dashboard() {
  const[transactions,setTransations]=useState([]);
  const[loding, setLoding]=useState(false);
  const [user, authLoading] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const[income, setIncome]=useState(0);
  const[expense,setExpense]=useState(0);
  const[totalBalance,setTotalBalance]=useState(0);
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
      type:type,
      date:values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      let newArr=transactions;
      newArr.push(transaction);
      setTransations(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
      
    }
  }
  useEffect(()=>{
    fetchTransactions();
  },[user]);

  useEffect(()=>{
    calculateBalance();
  },[transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  // useEffect(()=>{
  //   calculateBalance();
  // },[transaction]);

  async function fetchTransactions() {
    setLoding(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransations(transactionsArray);
      console.log("Transation Array",transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoding(false);
  }
  return (
    <div>
      <Header/>
      {loding?(
        <p>Loding...</p>
      ):(
      <>
      <Cards 
      income={income}
      expense={expense}
      totalBalance={totalBalance}
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
          <TransactionsTable transactions={transactions}/>
    </>)}
    </div>
  );
}

export default Dashboard;