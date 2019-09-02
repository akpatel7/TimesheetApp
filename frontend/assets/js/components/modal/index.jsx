import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { modules } from 'setup';

import AddAsset from './add_asset';
import AddDependencies from './dependencies/add_dependencies';
import AddPromotedTag from './add_promoted_tag';
import AddPromotedTagsCategory from './project_admin/add_promoted_tags_category';
import AddRole from './project_admin/add_role';
import AddTag from './project_admin/add_tag';
import AddType from './project_admin/add_type';
import AddUser from './project_admin/add_user';
import AddWorkspace from './workspaces/add_workspace';
import AppSetup from './app_setup/';
import AssignUserToWorkspace from './workspaces/assign_user_to_workspace';
import ChangePassword from './change_password';
import ChangeProject from './change_project';
import CommitDetails from './commits/commit_details';
import DeleteDependency from './dependencies/delete_dependency';
import EditDependencyVersion from './dependencies/edit_dependency_version';
import ElectronSettings from './electron_settings';
import NewCommit from './commits/new_commit';
import NewMessage from './new_message/';
import ProfileUpdate from './profile_update/';
import ProjectPaths from './project_admin/project_paths/';
import ReimportWorkspace from './workspaces/reimport_workspace';
import StorageSetup from './storage_setup';
import UploadAssets from './upload_assets/';
import UploadCommit from './commits/upload_commit';

import ConfirmationButton from 'comps/generic/confirmation_button';

// Actions
import { closeModal } from 'actions/modal';

import './styles.scss';


class Modal extends React.Component {

    handleClick = event => {
        if (!document.querySelector('.modal').contains(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            this.closeModal();
        }
    }

    handleKeyDown = event => {
        if (event.keyCode === 27) this.closeModal(); // Esc btn.
    }

    closeModal = () => {
        if (this.props.modal.args.confirmClose) return this.emitCloseClick();
        this.props.closeModal();
    }

    emitCloseClick = () => {
        if (this.props.modal.args.confirmClose) {
            let elements = document.querySelectorAll('.modal .close button');
            elements[elements.length - 1].click();
        }
    }

    componentWillReceiveProps = nextProps =>  {
        if (nextProps.modal.open) {
            setTimeout(() => {
                window.addEventListener('click', this.handleClick);
                window.addEventListener('keydown', this.handleKeyDown);
            }, 0);
        } else {
            setTimeout(() => {
                window.removeEventListener('click', this.handleClick);
                window.removeEventListener('keydown', this.handleKeyDown);
            }, 0);
        }
    }

    render = () => {
        let { modal, closeModal } = this.props;

        const options = modalTypes[modal.type];
        let modalWindow = (
            modal.open ?
                <div
                    onClick={ e => e.stopPropagation() }
                    className={ 'modal' }>
                    <div className='close'>
                        {
                            modal.args.confirmClose
                            ? (
                                <ConfirmationButton
                                    onConfirm={ closeModal }
                                    mainIcon='fa fa-close'
                                    mainClass='animated'
                                    confirmDelete={ true }
                                />
                            )
                            : (
                                <button onClick={ () => closeModal() }
                                        className='close'>
                                    <i className='fa fa-times'/>
                                </button>
                            )

                        }
                    </div>
                    { options }
                </div>
            : null
        );

        //NOTE: ReactCSSTransitionGroup delays the modal from disappearing, even after redux store has lost its data.
        //      we have if statements scattered around to cover this issue, but it's messy.
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName='modal'
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={200}>
                    { modalWindow }
                </ReactCSSTransitionGroup>
            </div>
        );
    };
};


const modalTypes = {
    addAsset: <AddAsset/>,
    addDependencies: <AddDependencies/>,
    addType: <AddType/>,
    addPromotedTag: <AddPromotedTag/>,
    addPromotedTagsCategory: <AddPromotedTagsCategory/>,
    addRole: <AddRole/>,
    addTag: <AddTag/>,
    addUser: <AddUser/>,
    addWorkspace: <AddWorkspace/>,
    appSetup: <AppSetup/>,
    assignUserToWorkspace: <AssignUserToWorkspace/>,
    changePassword: <ChangePassword/>,
    changeProject: <ChangeProject/>,
    commit: <CommitDetails/>,
    createCommit: <NewCommit/>,
    deleteDependency: <DeleteDependency/>,
    editDependencyVersion: <EditDependencyVersion/>,
    electronSettings: <ElectronSettings/>,
    newMessage: <NewMessage/>,
    profileUpdate: <ProfileUpdate/>,
    projectPaths: <ProjectPaths/>,
    reimportWorkspace: <ReimportWorkspace/>,
    storageSetup: <StorageSetup/>,
    uploadAssets: <UploadAssets/>,
    uploadCommit: <UploadCommit/>,
    ...modules.taskManager ? require('tm_comps/modal/').default : {}
};


const mapStateToProps = ({ modal }) => ({ modal });
export default connect(mapStateToProps, { closeModal })(Modal);
