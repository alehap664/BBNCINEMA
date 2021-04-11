const Room = require('../../../models/room.model');
const Chair = require('../../../models/chair.model');

module.exports = {
    index: async (req, res) => {
        // for (let index = 1; index < 11; index++) {
        // 	const room = {
        // 		roomID: "P" + index,
        // 		type: "normal",
        // 		quantityChair: 300	
        // 	}
        // 	await Room.findOneAndUpdate({roomID: room.roomID}, room, {upsert: true, useFindAndModify: false, returnOriginal: true}, (err, doc) => {
        // 		console.log(err);
        // 		console.log(doc);
        // 	})
        // }

        const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
        let list = [];
        for (let i = 0; i < alphabet.length; i++) {
            let num = alphabet[i] === "L" ? 16 : 18;
            for (let j = 0; j < num; j++) {
                let roomID = "P001";
                roomID = j.toString().length === 1 ? roomID + alphabet[i] + "0" : roomID + alphabet[i]
                list.push({
                    chairID: roomID + (j + 1),
                    line: alphabet[i]
                })
            }
        }


        const chairs = {
            roomID: "P001",
            filmID: "F210300002",
            date: "12/03/2021",
            timeTable: 1,
            chairs: list
        }

        const optFindOne = {
            roomID: chairs.roomID,
            date: chairs.date,
            timeTable: chairs.timeTable,
        }

        Chair.findOne(optFindOne, {}, {}, async (err, doc)=>{
            if (err) throw err
            if (!doc) {
                const opt = {
                    roomID: chairs.roomID,
                    filmID: chairs.filmID,
                    date: chairs.date,
                    timeTable: chairs.timeTable,
                }
        
                await Chair.findOneAndUpdate(opt, chairs, { upsert: true, useFindAndModify: true }, (err, doc) => {
                    console.log(err);
                    console.log(doc);
                })
            }
            else{
                console.log(`Room ${doc.roomID} have film ${doc.filmID}`);
            }
            
            res.send();
        })

        return
        
       

       
    }
}