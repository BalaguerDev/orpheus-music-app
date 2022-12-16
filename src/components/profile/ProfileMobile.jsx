import { useState } from 'react';
import { IoIosMore, IoMdCreate, IoMdReturnLeft } from 'react-icons/io';
import { useSelector } from 'react-redux';
import AvatarImg from '../general_components/AvatarImg'
import FooterInfo from '../general_components/FooterInfo';
import { Footer } from '../style/generalStyle';
import { DivSliders } from '../style/homeStyle';
import { DivMobileUserAvatar, DivProfile, DivProfileActionsStyle, DivProfileBanner, DivProfileUserInfoContainer, DivUserGeneralData, DivUsernameWorks, DropdownContainer, DropdownHeader, H1Username, H2UserWorks, ListItem, PProfileUserInfo, SectionEditUser, SectionProfileMain, SpanProfileUserNumbers } from '../style/profileStyle'
import AddWork from './AddWork';
import CreatePlaylist from './CreatePlaylist';
import DisconnectIcon from './DisconnectIcon';
import ProfileSlider from './profile_main/ProfileSlider';
import UpdateProfile from './UpdateProfile';


const ProfileMobile = () => {
    const user = useSelector(state => state.userData.user);
    const [editView, setEditView] = useState(false);
    const userData = useSelector(state => state.userData.user.userData)
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const dataKey = [
        {id: 1, name:"My playlists", type: "playlist", data: user.myPlaylists}, 
        {id: 2, name:"Fav. playlists", type: "playlist", data: user.favPlaylists}, 
        {id: 3, name:"Fav. albums", type: "albums", data: user.favAlbums}, 
        {id: 4, name:"Fav. tracks", type: "tracks", data: user.favTracks}, 
        {id: 5, name:"Followers", type: "users", data: user.followers}, 
        {id: 6, name:"Following", type: "users", data: user.following}
    ]

    return (
        <DivProfile>
            <DivProfileBanner>
                <DropdownContainer>
                        <DropdownHeader onClick={toggling}><IoIosMore /></DropdownHeader>
                        {isOpen && (
                        <ul>
                            <ListItem >
                                {!editView
                                ?
                                <div onClick={() => setEditView(prev => prev = true)}> Edit <IoMdCreate/> </div> 
                                :
                                <div onClick={() => setEditView(prev => prev = false)}> Return <IoMdReturnLeft/> </div>}
                            </ListItem >
                            <DisconnectIcon />
                        </ul>
                        )}
                </DropdownContainer>
                <DivMobileUserAvatar>
                    <AvatarImg
                        size={160}
                        avatarId={userData.avatar}
                    />
                </DivMobileUserAvatar>

                <DivUserGeneralData>
                    <DivUsernameWorks>
                        <H1Username>{userData.username}</H1Username>
                        <H2UserWorks>23 works</H2UserWorks>
                    </DivUsernameWorks>
                    <DivProfileUserInfoContainer>
                        <PProfileUserInfo>
                            <SpanProfileUserNumbers>22</SpanProfileUserNumbers>
                            Playlists
                        </PProfileUserInfo>
                        <PProfileUserInfo>
                            <SpanProfileUserNumbers>22</SpanProfileUserNumbers>
                            Followers
                        </PProfileUserInfo>
                        <PProfileUserInfo>
                            <SpanProfileUserNumbers>22</SpanProfileUserNumbers>
                            Following
                        </PProfileUserInfo>
                    </DivProfileUserInfoContainer>
                </DivUserGeneralData>

            </DivProfileBanner>


            {!editView
                ?
                <SectionProfileMain>
                    <DivProfileActionsStyle>
                        <AddWork />
                        <CreatePlaylist />
                    </DivProfileActionsStyle>
                    
                    <DivSliders>
                        {dataKey.map(key => {
                            if (key.data.length > 0){
                                return <ProfileSlider key={key.id} dataKey={key} />
                            }
                        })}
                    </DivSliders>

                </SectionProfileMain>
                :
                <SectionEditUser>
                    <UpdateProfile />
                </SectionEditUser>}
            <Footer><FooterInfo /></Footer>
        </DivProfile>
    )
}

export default ProfileMobile