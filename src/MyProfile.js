import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from './hooks/userSlice';
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';

const MyProfile = () => {

  const user = useSelector((state) => state.currentUser.currentUser);
  const [fullName, setFullName] = useState('');
  const [newfullName, setNewFullName] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [willEditName, setWillEditName] = useState(false);
  const [willEditPass, setWillEditPass] = useState(false);
  const [willEdit, setWillEdit] = useState(false);

  const navigate = useNavigate();
  const deleteContainer = document.querySelector('.deleteMsgBack');

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:8080/users/' + user)
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setFullName(data.fullName);
          setNewFullName(data.fullName);
          setPassword(data.password);
        }
      }).catch((error) => {
        console.error(error);
      });

  }, [password, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (willEditName) {
      await fetch('http://localhost:8080/users/' + user, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newfullName
        })
      })
        .then(() => {
          setFullName(newfullName);
          cancelChanges();
        });
    }
    if (willEditPass) {
      await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user,
          password: oldPassword
        })
      })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(async (data) => {
          if (data.password) {
            await fetch('http://localhost:8080/users/' + user, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                password: newPassword
              })
            })
              .then(() => {
                document.querySelector('.oldPassword').classList.remove('input-notvalid');
                cancelChanges();
              });
          } else {
            document.querySelector('.oldPassword').classList.add('input-notvalid');
          }
        })
    }
  }

  const editName = () => {
    setNewFullName(fullName);
    setWillEdit(true);
    setWillEditName(true);
  }

  const editPass = () => {
    setWillEdit(true);
    setWillEditPass(true);
  }

  const cancelChanges = () => {
    setWillEdit(false);
    setWillEditName(false);
    setWillEditPass(false);
    setNewFullName(fullName);
    setNewPassword('');
    setOldPassword('');
  }

  const confirmDeleteUser = () => {
    setConfirmDelete(true);
    deleteContainer.classList.remove('hide');
  };

  function cancelDelete() {
    setConfirmDelete(false);
    deleteContainer.classList.add('hide');
  }

  const deleteUser = () => {
    fetch('http://localhost:8080/users/' + user, {
      method: 'DELETE'
    })
      .then(() => {
        setConfirmDelete(false);
        setUserDeleted(true);
        dispatch(resetUser());
        goToHome();
      })
      .catch((err => {
        console.log(err);
      }));
  }

  function goToHome() {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <div className="myProfile">
      <div className="myProfile-cont">
        <h1 className="myProfile-title">My Profile</h1>
        <div className="username-cont">
          <p className="username-text userKey"><b>Username:</b></p>
          <p className="username-value userValue">{user}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="fullName-cont">
            {!willEditName &&
              <div className="fullName-read flexrow">
                <p className="userKey"><b>Full name:</b></p>
                <p className="fullName userValue">{fullName}</p>
              </div>
            }
            {willEditName &&
              <label className="flexrow">
                <b className="userKey">Full name:</b>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="fullname-edit"
                  pattern="^[a-zA-Z ]+$"
                  minLength={2}
                  value={newfullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                />
              </label>
            }
          </div>
          <div className="password-cont">
            {willEditPass &&
              <div className="password-edit flexrow">
                <p className="userKey"><b>Password:</b></p>
                <div className="inputPassContainer">
                  <input
                    type="password"
                    placeholder="Old password"
                    aria-label="Old password"
                    className="oldPassword"
                    minLength={8}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    aria-label="New password"
                    className="newPassword"
                    minLength={8}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
            }
          </div>
          {willEdit && <button type="submit" className="save">Save</button>}
          {willEdit && <button type="button" className="cancel" onClick={cancelChanges}>Cancel</button>}
        </form>
        <div className="flexrow">
          {!willEdit && <button type="button" className="editName editbtn" onClick={editName}>Change name</button>}
          {!willEdit && <button type="button" className="editPass editbtn" onClick={editPass}>Change password</button>}
        </div>
        <button type="button" className="deleteUser" onClick={confirmDeleteUser}>Delete Account</button>
      </div>

      <div className="deleteMsgBack hide">
        <div className="deleteMsgCont">
          {confirmDelete &&
            <div className="confirmDelete">
              <p>Are you sure you want to permanently delete this account?</p>
              <div className="confirmBtnCont">
                <button className="deleteYes" onClick={deleteUser}>Yes</button>
                <button className="deleteNo" onClick={cancelDelete}>No</button>
              </div>
            </div>
          }
          {userDeleted &&
            <div className="deleteMsg">
              <CheckIcon />
              <p>Account Deleted</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MyProfile;