import react, { useState } from "react";
import "./App.css"
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from "./components/Alert";

const App = () => {
    const [charge, setCharge] = useState("");
    const [amount, setAmount] = useState(0);
    const [alert, setAlert] = useState({show:false});
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);
    const [expenses, setExpenses] = useState([
        {id:1, charge:"렌트비", amount:1600},
        {id:2, charge:"교통비", amount:400},
        {id:3, charge:"식비", amount:1200},
        {id:4, charge:"식비2", amount:1200},
    ])

    const handleCharge = (e) => {
        setCharge(e.target.value)
    }

    const handleAmount = (e) => {
        setAmount(e.target.valueAsNumber)
    }

    const initValue = ()=>{
        setCharge("");
        setAmount(0);
    }
    const handleDelete = (id)=>{
        const newExpense = expenses.filter(expense=>expense.id !== id)
        setExpenses(newExpense)
        handelAlert({type:'danger',text:'아이템이 삭제되었습니다.'});
    }

    const handelAlert = ({type,text})=>{
        setAlert({show:true, type, text});
        setTimeout(()=>{
            setAlert({show:false});
        },700);
    }

    const handleEdit = (id)=>{
        console.log( expenses.find(item=>item.id === id))
        const expense = expenses.find(item=>item.id === id)
        const {charge, amount} = expense;

        setId(id);
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
    }

    const clearItems =() =>{
        setExpenses([]);
        handelAlert({type:'danger',text:'목록이 삭제되었습니다.'});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(charge !== "" && amount > 0){
            if(edit){
                const newExpenses = expenses.map(item =>{
                    return item.id === id ? {...item, charge, amount} : item
                })

                setExpenses(newExpenses);
                setEdit(false);
                handelAlert({type:'success',text:'아이템이 수정되었습니다.'});
                initValue();
            } else {
                const newExpense = {
                    id: crypto.randomUUID(), // 유니크한값을 계속 생성해주는 crypto.randomUUID()
                    charge: charge,
                    amount: amount
                };
    
                const newExpenses = [...expenses, newExpense];
                initValue();
                setExpenses(newExpenses);
                handelAlert({type:'success',text:'아이템이 생성되었습니다.'});
            }
        } else {
            handelAlert({type:'danger',text:'charge는 빈 값일 수 없으며 amount는 0보다 커야합니다.'});
        }
    }

    return (
        <main className="main-container" style={{width: '90%', margin:'0 auto'}}>
            {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
            <h1>예산 계산기</h1>

            <div style={{width:'100%', background:'#fff',padding: '1rem'}}>
                <ExpenseForm 
                handleCharge={handleCharge}
                charge={charge}
                handleAmount={handleAmount}
                amount={amount}
                handleSubmit={handleSubmit}
                edit={edit}
                />
            </div>

            <div style={{width:'100%', background:'#fff',padding: '1rem'}}>
                <ExpenseList 
                expenses={expenses}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                clearItems={clearItems}
                />
            </div>

            <div style={{display:'flex', justifyContent:
        'end', marginTop: '1rem'}}>
            <p style={{fontSize: '2rem'}}>
                총지출 : 
                <span>
                    {expenses.reduce((acc,curr)=>{
                        return (acc += curr.amount)
                    }, 0)}
                    원
                </span>
            </p>
        </div>
        </main>
    )
}

export default App;
