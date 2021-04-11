const filmMiddleware = require("../../../middleware/v1/film.middleware");
const Film = require('../../../models/Cinema/film');
const Country = require("../../../models/Cinema/country");
const Category = require("../../../models/Cinema/category");

module.exports = {
	post: async (req, res) => {
		try {
			const filmFind = filmMiddleware.find(Film);

			const newFilm = {};
			newFilm.id = await filmMiddleware.newID(Film);

			for (const key in req.body) {
				const element = req.body[key];
				if (typeof element === "string" || typeof element === "number") {
					if (element.toString().length === 0) throw (`${key} is empty`);
					newFilm[key] = element;
					continue
				}
				if (element.length === 0) throw (`${key} is empty`)
				newFilm[key] = element;
			}
			newFilm.film__photos = [
				"https://lh3.google.com/u/0/d/1tJk9YhYzL2rdJIZvOnVosh23L0hHCyag=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1V0Tvu6Hs2AEoXazNxU0EERT8xHaCVCo_=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/14yfgbv2kfSF0OmO8QuuBjlqVOlBwyrSn=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1DUnh0bR3yoxVBpUcx-KGR6KiN5O14IHJ=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1N606y2xaAzW2cxpaEZyc_w9UUBqHkFNX=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1EvZ-NrqPTzPJPxESumspJKJbvSkrEfiW=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1EvZ-NrqPTzPJPxESumspJKJbvSkrEfiW=w0-nu-iv2",
				"https://lh3.google.com/u/0/d/16bHRi_xYgvyL1crYwJfSTbcsVi8N_iLr=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1fahwuflxSmiu6xWagVzSIYE2kFuFQq2E=w0-nu-iv1"
			];
			newFilm.film__trailer = "https://www.youtube.com/embed/odM92ap8_c0";
			newFilm.film__thumb = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg";
			newFilm.film__video = {
				"_18": "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
				"_22": "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
				"_37": "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
			};
			const bg = [
				"https://lh3.google.com/u/0/d/1PSMW2Rdk39KiY_hYO18c_qOvvUbE6eum=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1JnweRX0DwZWAaWZLHD9qrXP87nZ0yX5V=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1OO9o-3ClE1aBvi046AmMXjcQQtoBA5BW=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1-lhfM9iATykSKJiG_Irh1AmZyKY8BCY3=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1y70gQ1IDCIhiKJQesFIePyKmlTaDmpb4=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1GTWsmDXfErpiqoZgM7PTogQmKW5p2wST=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1QhJ3kiHx2_7kC5rE_VR-AdKuEt8L3k77=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/16Ui20_6SAoT1eoYFD19aq7KpbqlsEfTf=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/150diI1uvCc9tpzjmlzlWvKDXxix-dw16=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1LKvMB4NGUVdfCNYvZU9d9Rogr-bQKf9N=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1hVHGWCDr4jGZyw90dQK3SURz3mMTAyNM=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1GoyDwdsk95Xkv2iyyULfdMo3DOS_a_kQ=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1TtJaH7Y-z13qHCrsxGUnksacWGxiVaX-=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1N7fJiHCV_EStw3GZBrWTRkndF2cuKA3N=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/17gqdC6M9pgbUO1EUmOgRsiiYUV8SAtVt=w0-nu-iv1",
				"https://lh3.google.com/u/0/d/1VxjniMxY8M9CP9YN6fCQAlXU5mpS0LNM=w0-nu-iv1",
			]
			newFilm.film__bg = bg[Math.floor(Math.random() * bg.length)]
			newFilm.film__rate = +(Math.random() * 10).toFixed(1);
			// Check Tồn tại
			const docs = await filmFind({ "film__title": newFilm.film__title });
			if (docs.length !== 0) {
				res.status(400).send({
					error: `Film ${newFilm.film__title} đã tồn tại`,
				});
				return
			}
			// Thêm vào DB
			new Film(newFilm).save((err, doc) => {
				if (err) {
					const newErr = err.errors[Object.keys(err.errors)[0]].message;
					console.log(newErr);
					res.status(400).send({ error: newErr });
					return
				}
				res.status(200).send({ success: "Thêm thành công" })
			})

		} catch (error) {
			console.log(error);
		}
	},

	get: async (req, res) => {
		try {
			const { limit, categories } = req.query;
			console.log(categories);

			if (limit) {
				console.log(limit);
				if (isNaN(limit) || +limit <= 0) return res.status(400).send({ error: 'Limit not valid' });
			}

			if (categories) {
				let condition;
				if (typeof categories === "string") {
					const arr = categories.split("");
					arr[0] = arr[0].toUpperCase();
					condition = [arr.join("")];
					console.log(condition);
				} else {
					condition = [...categories].map(ele => {
						const arr = ele.split("");
						arr[0] = arr[0].toUpperCase();
						return arr.join("");
					})
				}
				const filter = {
					film__categories: { $in: condition }
				}
				const data = await Film.find(filter).limit(+limit).exec();
				res.type('json').send(JSON.stringify(data, null, 2));
				return
			}

			const data = await Film.find().limit(+limit).exec();
			res.type('json').send(JSON.stringify(data, null, 2));

		} catch (error) {
			console.log(error);
		}

	},
	getByID: async (req, res) => {
		const id = req.params.id;
		const data = await Film.findOne({ id: id });
		console.log(data);
		!data
			? res.status(404).send({ error: "ID not valid" })
			: res.json(data)
	},
	getCountry: async (req, res) => {
		let data = await Country.find().exec();
		res.type('json').send(JSON.stringify(data, null, 2))
	},
	getCategory: async (req, res) => {
		let data = await Category.find().exec();
		res.type('json').send(JSON.stringify(data, null, 2))
	}
}