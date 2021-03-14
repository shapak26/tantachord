import { useState } from 'react'

function Form(props) {

    const { chordLists, setChordList } = props

    function handleChordChange(index, event) {

        let values = [...chordLists]
        values[index][event.target.name] = event.target.value
        setChordList(values)

    }

    function handleTimeChange(index, event) {

        let values = [...chordLists]
        values[index][event.target.name] = parseFloat(event.target.value)
        setChordList(values)

    }

    function handlePlusButton() {

        setChordList([...chordLists, {
            time: 0,
            chord: ''
        }])
    }

    function handleRemoveChord(index) {

        let values = [...chordLists]
        values.splice(index, 1)

        setChordList(values)


    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(chordLists)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {
                    chordLists.map((chordList, index) => {
                        return (
                            <div key={index}>
                                <label for="chord">คอร์ด</label>
                                <input type="text" name="chord" id="chord" value={chordList.chord} onChange={(event => {
                                    handleChordChange(index, event)
                                })} />
                                <label for="time">เวลา</label>
                                <input type="number" name="time" id="time" step="0.01" value={chordList.time} onChange={(event => {
                                    handleTimeChange(index, event)
                                })} />
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    handlePlusButton()
                                }}>เพิ่ม</button>
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    handleRemoveChord(index)
                                }} >ลบ</button>
                            </div>
                        )
                    })
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form