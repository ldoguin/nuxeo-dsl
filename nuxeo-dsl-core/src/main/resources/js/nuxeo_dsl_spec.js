"use strict"
const expect = require("chai").expect
const parse = require("./nuxeo_dsl").parse


describe("Nuxeo DSL", () => {
    context("Document type", () => {
        it("Can be defined", () => {
            let inputText =
                "doctype myDoc {}" +
                "\r\ndoctype otherDoc"
            let result = parse(inputText)

            expect(result.value).to.deep.equal({
                doctypes: [
                  {name:"myDoc",extends:"Document"},
                  {name:"otherDoc",extends:"Document"}
                ]
            })
        })

        it("Can inherit from a parent type", () => {
            let inputText =
                "doctype myDoc extends File {}"
            let result = parse(inputText)

            expect(result.value).to.deep.equal({
                doctypes: [
                  {name:"myDoc", extends: "File"}
                ]
            })
        })

        it("Can set the schemas", () => {
            let inputText =
                "doctype myDoc extends File {" +
                "\r\n   schemas {" +
                "\r\n      common" +
                "\r\n      dublincore lazy" +
                "\r\n   }" +
                "\r\n}"
            let result = parse(inputText)

            expect(result.value).to.deep.equal({
                doctypes: [
                  {
                        name:"myDoc",
                        extends: "File",
                        schemas: [
                              {name: "common", lazy: false},
                              {name: "dublincore", lazy: true}
                        ]
                  }
                ]
            })
        })
    })

    context("Schemas definition", () => {
      it("Can be defined", () => {
            let inputText =
                "schema mySchema {prop1 String, prop2 , prop3 Integer }"
            let result = parse(inputText)

            expect(result.value).to.deep.equal({
                schemas: [
                  {
                        name:"mySchema",
                        prefix:"",
                        fields:{
                              prop1: { type: "String"},
                              prop2: { type: "String"},
                              prop3: { type: "Integer"}
                        }
                  }
                ]
            })
        })

    })

    context("Facets definition", () => {
    })

    context("Page Providers", () => {
    })



})