import { Button, Image } from "antd";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate()
  return (
    <>
      <div className="main--container">
        <div className="heading--container">
          <h2 className="content--heading">My profile</h2>
        </div>

        <div className="profile--container">
          <div className="profile--left--container">
            <div className="personal--info">
              <div className="profile--info--top--container">
                <div className="avatar--img--wrap">
                  <Image
                    className="avatar--img"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                  />
                </div>
                <div className="username--wrap">
                  <h1 className="username">Jaseel Thalikulam</h1>
                  <span className="secondary--text">@Jaseel2121</span>
                  <Button type="link" className="edit--btn" onClick={()=>navigate('/edit-profile')}>
                    Edit Profile
                  </Button>
                </div>
    
              </div>
              <div className="profile--info--bottom--container">
                <h3 className="content--heading">Personal Information</h3>
               
                <div className="profile--info--bottom--container--child">
                  <div>
                  <label className="secondary--text">Full Name</label>
                  <h4>Jaseel T A</h4>
                  </div>
                </div>
                <div className="profile--info--bottom--container--child">
                  <div>
                  <label className="secondary--text">Email</label>
                  <h4>jaseelta1@gmail.com</h4>
                  </div>
                  <div>
                  <label className="secondary--text">Contact Number</label>
                  <h4>9746697961</h4>
                  </div>
                </div>
                <div className="profile--info--bottom--container--child">
                  <div>
                  <label className="secondary--text">Bio</label>
                  <h4>CEO & Co-founder of Chef Hut</h4>
                  </div>
                 
                </div>

              
                
                
              </div>
            </div>
          </div>
          <div className="profile--right--container">
            <div className="address--container">
            <div className="profile--info--bottom--container">
                <h3 className="content--heading">Address</h3>
               
                <div className="profile--info--bottom--container--child">
                  <div>
                  <label className="secondary--text">Country</label>
                  <h4>India</h4>
                  </div>
                  <div>
                  <label className="secondary--text">State</label>
                  <h4>Kerala</h4>
                  </div>
                </div>
                <div className="profile--info--bottom--container--child">
                  
                  <div>
                  <label className="secondary--text">City</label>
                  <h4>Palakkad</h4>
                  </div>
                  <div>
                  <label className="secondary--text">Postal Code</label>
                  <h4>10011</h4>
                  </div>
                 
                </div>
               
              </div>
          </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default Profile;
