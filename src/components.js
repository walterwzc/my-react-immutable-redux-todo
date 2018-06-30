import React from 'react'

export function Todo(props) {
    const { todo } = props

    if (todo.isDone) {
        return <strike>{todo.text}</strike>
    } else {
        return <span>{todo.text}</span>
    }
}

export function TodoList(props) {
    const { todos, toggleTodo, addTodo } = props

    const onSubmit = event => {
        const input = event.target
        const text = input.value
        const isEnterKey = event.which == 13
        const isLongEnough = text.length > 0

        if (isEnterKey && isLongEnough) {
            input.value = ''
            addTodo(text)
        }
    }

    // const toggleClick = id => event => toggleTodo(id)

    // 等同于：
    const toggleClick = function(id) {
        // 这一层是在 onClick 之后，真正执行的函数，所以其参数之中，能够引用到event
        return function(event) {
            return toggleTodo(id)
        }
    }

    // 错误： 因为这个相当于函数的定义，如果放在onClick后面加括号， 等于直接执行，所以会返回两层函数！！！
    // const toggleClick = id => toggleTodo(id)

    return (
        <div className="todo">
            <input
                type="text"
                className="todo__entry"
                placeholder="Add todo"
                onKeyDown={onSubmit}
            />
            <ul className="todo__list">
                {todos.map(t => (
                    <li
                        key={t.get('id')}
                        className="todo__item"
                        onClick={toggleClick(t.get('id'))}>
                        {/* 因为自己总是按照如下的方式来进行书写，返回一个函数的执行，而不是返回一个函数的引用，所以没有明白上面的代码 */}
                        {/* onClick={() => {
                            toggleClick(t.get('id'))
                        }} */}
                        <Todo todo={t.toJS()} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
