import React, { Component } from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({handleDelete, initialExpenses}) =>{
	return (
		<React.Fragment>
			<ul className='list'>
				{initialExpenses.map(expense=>{
					return(
						<ExpenseItem 
						expense={expense} key={expense.id}
						handleDelete={handleDelete}
						/>
					)
				})}
				
			</ul>
			<button className='btn'>목록지우기<MdDelete className='btn-icon'/></button>
		</React.Fragment>
	)
}

export default ExpenseList
