import notebook from "../assets/icons/acct/notebook.svg";

export default function AddressBook() {
    return (
      <>
          <div className="mtg bbot"><h3>Address Book</h3></div>
                 <div className="container">
                  <div className="content">
                     <img src={notebook}alt="" />
                     <p>You have not added any address yet</p>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. illis tofi </p>
                      <p> dolor sit amet blocka desuo madf consci elit.beauty ,sofilli mantis</p>
                   <a href="/"><button className="mt-3 btn btn-success rounded-3">CONTINUE SHOPPING</button></a>
                  </div>
              </div>
      </>
    )
  }