import react, { useState } from "react";
import "./App.css"
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

const App = () => {
    const [charge, setCharge] = useState("");
    const [amount, setAmount] = useState(0);

    const [expenses, setExpenses] = useState([
        {id:1, charge:"렌트비", amount:1600},
        {id:2, charge:"교통비", amount:400},
        {id:3, charge:"식비", amount:1200}
    ])

    const handleCharge = (e) => {
        setCharge(e.target.value)
    }

    const handleAmount = (e) => {
        setAmount(e.target.valueAsNumber)
    }

    const handleDelete = (id)=>{
        const newExpense = expenses.filter(expense=>expense.id !== id)
        setExpenses(newExpense)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(charge !== "" && amount > 0){
            const newExpense = {
                id: crypto.randomUUID(), // 유니크한값을 계속 생성해주는 crypto.randomUUID()
                charge: charge,
                amount: amount
            };

            const newExpenses = [...expenses, newExpense];
            setCharge("");
            setAmount(0);
            setExpenses(newExpenses)
        } else {
            alert('값을 입력하세요!')
        }
    }

    return (
        <main className="main-container" style={{width: '90%', margin:'0 auto'}}>
            <h1>예산 계산기</h1>

            <div style={{width:'100%', background:'#fff',padding: '1rem'}}>
                <ExpenseForm 
                handleCharge={handleCharge}
                charge={charge}
                handleAmount={handleAmount}
                amount={amount}
                handleSubmit={handleSubmit}
                />
            </div>

            <div style={{width:'100%', background:'#fff',padding: '1rem'}}>
                <ExpenseList 
                initialExpenses={expenses}
                handleDelete={handleDelete}
                />
            </div>

            <div style={{display:'flex', justifyContent:
        'end', marginTop: '1rem'}}>
            <p style={{fontSize: '2rem'}}>
                총지출 : <span>원</span>
            </p>
        </div>
        </main>
    )
}

export default App;
