import React from 'react';
import Avatar from '../../avatar';

const InfoCard = ({user, onEditClick}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={onEditClick}>
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    {/* <img
                        src="https://avatars.dicebear.com/api/avataaars/qweqwdas"
                        className="rounded-circle"
                        width="150"
                    /> */}
                    <Avatar
                        style={
                            {width: 150}
                        }
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">{user.profession.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
